import { Alert, inMemoryAlerts } from '../models/Alert.js';
import { Asset } from '../models/Asset.js';
import { analyzeAlertWithLLM } from '../services/aiService.js';
import mongoose from 'mongoose';

let mockDashboardStats = {
  securityScore: 100,
  previousScore: 94,
  scoreChange: 6,
  lastUpdated: new Date().toISOString(),
  threatCounts: { critical: 0, high: 0, medium: 0, low: 0 },
  activeIncidents: 0,
  activeThreats: 0,
  assetsMonitored: 20,
  vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 }
};

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

async function getAlertsFromStore() {
  if (isDbConnected()) {
    return await Alert.find().sort({ timestamp: -1 }).limit(200);
  }
  return inMemoryAlerts;
}

export function setupRoutes(app) {
  // Dashboard stats - real calculation from DB
  app.get('/api/dashboard/stats', async (req, res) => {
    try {
      const alerts = await getAlertsFromStore();
      const critical = alerts.filter(a => a.severity === 'CRITICAL' && !['RESOLVED','CLOSED'].includes(a.status)).length;
      const high = alerts.filter(a => a.severity === 'HIGH' && !['RESOLVED','CLOSED'].includes(a.status)).length;
      const medium = alerts.filter(a => a.severity === 'MEDIUM' && !['RESOLVED','CLOSED'].includes(a.status)).length;
      const low = alerts.filter(a => a.severity === 'LOW' && !['RESOLVED','CLOSED'].includes(a.status)).length;
      
      const impact = critical*8 + high*4 + medium*2 + low*0.5;
      const score = Math.max(15, Math.min(100, 100 - impact));

      const stats = {
        securityScore: score,
        previousScore: score - 6,
        scoreChange: 6,
        lastUpdated: new Date().toISOString(),
        threatCounts: { critical, high, medium, low },
        activeIncidents: alerts.filter(a => a.status === 'NEW' || a.status === 'INVESTIGATING').length,
        activeThreats: alerts.filter(a => a.status === 'NEW').length,
        assetsMonitored: 20,
        vulnerabilities: { critical: 2, high: 5, medium: 10, low: 15 }
      };
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Alerts
  app.get('/api/alerts', async (req, res) => {
    try {
      const { severity, status, search } = req.query;
      let alerts = await getAlertsFromStore();
      if (severity && severity !== 'ALL') alerts = alerts.filter(a => a.severity === severity);
      if (status && status !== 'ALL') alerts = alerts.filter(a => a.status === status);
      if (search) {
        const s = search.toLowerCase();
        alerts = alerts.filter(a => a.id.toLowerCase().includes(s) || a.title.toLowerCase().includes(s) || a.sourceIp.includes(s) || a.destinationIp.includes(s));
      }
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/alerts/:id', async (req, res) => {
    try {
      const alerts = await getAlertsFromStore();
      const alert = alerts.find(a => a.id === req.params.id);
      if (!alert) return res.status(404).json({ error: 'Alert not found' });
      res.json(alert);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // AI Analyze - real LLM call
  app.post('/api/ai/analyze/:id', async (req, res) => {
    try {
      const alerts = await getAlertsFromStore();
      const alert = alerts.find(a => a.id === req.params.id);
      if (!alert) return res.status(404).json({ error: 'Alert not found' });

      console.log(`[AI] Analyzing alert ${alert.id} - ${alert.title} (real=${!alert.isSimulation})`);
      const analysis = await analyzeAlertWithLLM(alert);

      // Save analysis
      if (isDbConnected()) {
        await Alert.updateOne({ id: alert.id }, { aiAnalysis: analysis });
      } else {
        const idx = inMemoryAlerts.findIndex(a => a.id === alert.id);
        if (idx >= 0) inMemoryAlerts[idx].aiAnalysis = analysis;
      }

      // Emit via Socket.IO
      req.io.emit('ai-analysis-completed', { alertId: alert.id, analysis });

      res.json(analysis);
    } catch (err) {
      console.error('[AI] Error', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Assets - mock for now, later from DB or nmap
  app.get('/api/assets', async (req, res) => {
    try {
      if (isDbConnected()) {
        const assets = await Asset.find();
        if (assets.length > 0) return res.json(assets);
      }
      // Fallback mock assets
      const { mockAssets } = await import('../services/seed.js');
      res.json(mockAssets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Simulate endpoint for demo (creates real alert, not SIM)
  app.post('/api/simulate/:type', async (req, res) => {
    try {
      const type = req.params.type.toUpperCase();
      const fakeEve = {
        timestamp: new Date().toISOString(),
        event_type: 'alert',
        src_ip: `203.0.113.${Math.floor(Math.random()*254)}`,
        src_port: 40000 + Math.floor(Math.random()*20000),
        dest_ip: '192.168.56.10',
        dest_port: 80,
        proto: 'TCP',
        alert: {
          signature: type === 'NETWORK_SCAN' ? 'ET SCAN NMAP -sS' : type === 'BRUTE_FORCE' ? 'ET SCAN Potential SSH Scan' : 'ET WEB_SERVER SQL Injection',
          severity: type === 'CRITICAL' ? 1 : 2,
          category: 'Attempted Information Leak'
        }
      };
      
      // Import parser dynamically
      const { parseEveToAlert } = await import('../services/eveParser.js');
      const alert = parseEveToAlert(fakeEve);
      alert.isSimulation = false; // REAL for demo purposes

      if (isDbConnected()) {
        await Alert.create(alert);
      } else {
        inMemoryAlerts.unshift(alert);
      }

      req.io.emit('new-alert', alert);
      res.json(alert);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Incidents, Vulnerabilities - simplified for now
  app.get('/api/incidents', (req, res) => res.json([]));
  app.get('/api/vulnerabilities', (req, res) => res.json([]));
  app.get('/api/events', async (req, res) => {
    const alerts = await getAlertsFromStore();
    const events = alerts.slice(0,50).map(a => ({
      id: a.id,
      timestamp: a.timestamp,
      type: a.type,
      severity: a.severity,
      source: a.sourceIp,
      destination: a.destinationIp,
      description: a.title,
      risk: a.riskScore,
      isSimulation: a.isSimulation
    }));
    res.json(events);
  });
}
