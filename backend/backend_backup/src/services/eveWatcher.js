import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseEveToAlert, parseHttpToEvent } from './eveParser.js';
import { Alert, inMemoryAlerts } from '../models/Alert.js';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let watcher = null;
let assetMap = {}; // ip -> asset for criticality boost

async function loadAssetMap() {
  try {
    const { Asset } = await import('../models/Asset.js');
    if (mongoose.connection.readyState === 1) {
      const assets = await Asset.find();
      assetMap = {};
      assets.forEach(a => { if (a.ip) assetMap[a.ip] = a; });
      console.log(`[AssetMap] Loaded ${Object.keys(assetMap).length} assets for criticality`);
    }
  } catch (e) {
    console.warn('[AssetMap] Could not load, using empty map');
  }
}

function getEvePath() {
  if (process.env.EVE_JSON_PATH) return process.env.EVE_JSON_PATH;
  if (process.env.EVE_MODE === 'mock') return path.join(__dirname, '../../suricata/eve.json');
  return '/var/log/suricata/eve.json';
}

export function startEveWatcher(io) {
  const evePath = getEvePath();
  console.log(`[EVE Watcher] Watching ${evePath} mode=${process.env.EVE_MODE || 'real'}`);

  loadAssetMap();
  setInterval(loadAssetMap, 60000); // refresh every minute

  // Ensure file exists
  const dir = path.dirname(evePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`[EVE Watcher] Created directory ${dir}`);
  }
  if (!fs.existsSync(evePath)) {
    fs.writeFileSync(evePath, '');
    console.log(`[EVE Watcher] Created empty file ${evePath}`);
  }

  let fileSize = fs.statSync(evePath).size;
  let buffer = '';

  const processLine = async (line) => {
    if (!line.trim()) return;
    try {
      const eve = JSON.parse(line);
      const alert = parseEveToAlert(eve, assetMap);
      if (alert) {
        // Save to DB or memory
        if (mongoose.connection.readyState === 1) {
          try {
            await Alert.create(alert);
            console.log(`[EVE] REAL Alert created: ${alert.id} ${alert.title} Risk ${alert.riskScore} ${alert.sourceIp}→${alert.destinationIp} [${alert.severity}]`);
          } catch (err) {
            if (err.code !== 11000) console.error('[EVE] DB save error', err.message);
          }
        } else {
          inMemoryAlerts.unshift(alert);
          if (inMemoryAlerts.length > 500) inMemoryAlerts.pop();
          console.log(`[EVE] REAL Alert (memory): ${alert.id} ${alert.title} Risk ${alert.riskScore}`);
        }

        // Emit real-time
        io.emit('new-alert', alert);
        io.emit('new-event', {
          id: alert.id,
          timestamp: alert.timestamp,
          type: alert.type,
          severity: alert.severity,
          source: alert.sourceIp,
          destination: alert.destinationIp,
          description: alert.title,
          risk: alert.riskScore,
          isSimulation: false
        });
        io.emit('score-update', { timestamp: new Date().toISOString() });
      }

      // Also check http suspicious
      const httpEvent = parseHttpToEvent(eve);
      if (httpEvent) {
        io.emit('new-event', httpEvent);
      }

    } catch (err) {
      // Not JSON or parse error, ignore
    }
  };

  // Initial read from end of file (tail -f behavior)
  // For demo, you might want to read entire file: set READ_FROM_START=true
  const readFromStart = process.env.READ_FROM_START === 'true';
  if (readFromStart) {
    const content = fs.readFileSync(evePath, 'utf-8');
    content.split('\n').forEach(line => processLine(line));
    fileSize = fs.statSync(evePath).size;
  }

  // Watch file for changes (polling)
  fs.watchFile(evePath, { interval: 500 }, (curr, prev) => {
    if (curr.size < fileSize) {
      // File truncated (log rotation)
      fileSize = 0;
      buffer = '';
    }
    if (curr.size > fileSize) {
      const stream = fs.createReadStream(evePath, { start: fileSize, end: curr.size - 1, encoding: 'utf-8' });
      stream.on('data', (chunk) => {
        buffer += chunk;
        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line
        lines.forEach(processLine);
      });
      stream.on('end', () => {
        fileSize = curr.size;
      });
    }
  });

  console.log(`[EVE Watcher] Tailing ${evePath} for real alerts... (no SIM badge)`);
  console.log(`[EVE Watcher] To test without Suricata: echo '{"timestamp":"2024-09-10T10:00:00","event_type":"alert","src_ip":"192.168.56.50","src_port":1234,"dest_ip":"192.168.56.10","dest_port":80,"proto":"TCP","alert":{"signature":"ET SCAN NMAP -sS","severity":2,"category":"Attempted Information Leak"}}' >> ${evePath}`);

  watcher = { path: evePath };
  return watcher;
}

export function stopEveWatcher() {
  if (watcher) {
    fs.unwatchFile(watcher.path);
    console.log('[EVE Watcher] Stopped');
  }
}
