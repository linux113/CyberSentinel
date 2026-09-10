import { mockAlerts, mockAssets, mockDashboardStats, mockIncidents, mockSecurityEvents, mockVulnerabilities, threatActivityByHour, threatCategories } from '../lib/mockData';
import { Alert, Asset, DashboardStats, Incident, Vulnerability, SecurityEvent, AIAnalysis } from '../lib/types';

// Simulated latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// In-memory mutable store to allow demo mode mutations
let alerts: Alert[] = [...mockAlerts];
let incidents: Incident[] = [...mockIncidents];
let assets: Asset[] = [...mockAssets];
let vulnerabilities: Vulnerability[] = [...mockVulnerabilities];
let securityEvents: SecurityEvent[] = [...mockSecurityEvents];

let securityScore = mockDashboardStats.securityScore;

// Service layer - API ready for future backend integration
// For now uses mock data, later will call /api/* endpoints

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(300);
  const critical = alerts.filter(a=>a.severity==='CRITICAL' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length;
  const high = alerts.filter(a=>a.severity==='HIGH' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length;
  const medium = alerts.filter(a=>a.severity==='MEDIUM' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length;
  const low = alerts.filter(a=>a.severity==='LOW' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length;
  
  // Dynamic score based on threats
  const impact = critical*8 + high*4 + medium*2 + low*0.5 + vulnerabilities.filter(v=>v.status==='OPEN' && v.severity==='CRITICAL').length*5;
  const calcScore = Math.max(15, Math.min(100, 100 - impact + Math.floor(Math.random()*3)));

  return {
    securityScore: securityScore,
    previousScore: calcScore - 6,
    scoreChange: 6,
    lastUpdated: new Date().toISOString(),
    threatCounts: { critical, high, medium, low },
    activeIncidents: incidents.filter(i=>i.status !== 'RESOLVED' && i.status !== 'CLOSED').length,
    activeThreats: alerts.filter(a=>a.status === 'NEW' || a.status === 'INVESTIGATING').length,
    assetsMonitored: assets.length,
    vulnerabilities: {
      critical: vulnerabilities.filter(v=>v.severity==='CRITICAL' && v.status==='OPEN').length,
      high: vulnerabilities.filter(v=>v.severity==='HIGH' && v.status==='OPEN').length,
      medium: vulnerabilities.filter(v=>v.severity==='MEDIUM' && v.status==='OPEN').length,
      low: vulnerabilities.filter(v=>v.severity==='LOW' && v.status==='OPEN').length,
    }
  };
}

export async function getAlerts(filters?: { severity?: string; status?: string; search?: string; }): Promise<Alert[]> {
  await delay(250);
  let result = [...alerts];
  if (filters?.severity && filters.severity !== 'ALL') {
    result = result.filter(a=>a.severity === filters.severity);
  }
  if (filters?.status && filters.status !== 'ALL') {
    result = result.filter(a=>a.status === filters.status);
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(a=> 
      a.id.toLowerCase().includes(s) ||
      a.title.toLowerCase().includes(s) ||
      a.sourceIp.includes(s) ||
      a.destinationIp.includes(s) ||
      a.type.toLowerCase().includes(s)
    );
  }
  return result.sort((a,b)=> new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getAlert(id: string): Promise<Alert | undefined> {
  await delay(200);
  return alerts.find(a=>a.id===id);
}

export async function getIncidents(filters?: { status?: string; severity?: string; search?: string; }): Promise<Incident[]> {
  await delay(250);
  let result = [...incidents];
  if (filters?.status && filters.status !== 'ALL') result = result.filter(i=>i.status===filters.status);
  if (filters?.severity && filters.severity !== 'ALL') result = result.filter(i=>i.severity===filters.severity);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(i=> i.id.toLowerCase().includes(s) || i.title.toLowerCase().includes(s));
  }
  return result.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getIncident(id: string): Promise<Incident | undefined> {
  await delay(200);
  return incidents.find(i=>i.id===id);
}

export async function getAssets(filters?: { status?: string; type?: string; search?: string; }): Promise<Asset[]> {
  await delay(250);
  let result = [...assets];
  if (filters?.status && filters.status !== 'ALL') result = result.filter(a=>a.status===filters.status);
  if (filters?.type && filters.type !== 'ALL') result = result.filter(a=>a.type===filters.type);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(a=> a.name.toLowerCase().includes(s) || a.ip.includes(s) || a.id.toLowerCase().includes(s));
  }
  return result.sort((a,b)=> b.riskScore - a.riskScore);
}

export async function getAsset(id: string): Promise<Asset | undefined> {
  await delay(200);
  return assets.find(a=>a.id===id);
}

export async function getVulnerabilities(filters?: { severity?: string; status?: string; search?: string; }): Promise<Vulnerability[]> {
  await delay(250);
  let result = [...vulnerabilities];
  if (filters?.severity && filters.severity !== 'ALL') result = result.filter(v=>v.severity===filters.severity);
  if (filters?.status && filters.status !== 'ALL') result = result.filter(v=>v.status===filters.status);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    result = result.filter(v=> v.name.toLowerCase().includes(s) || v.asset.toLowerCase().includes(s) || (v.cve && v.cve.toLowerCase().includes(s)));
  }
  return result.sort((a,b)=> b.cvss - a.cvss);
}

export async function getSecurityEvents(limit = 50): Promise<SecurityEvent[]> {
  await delay(200);
  return securityEvents.slice(0, limit).sort((a,b)=> new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getThreatActivity() {
  await delay(200);
  return threatActivityByHour;
}

export async function getThreatCategories() {
  await delay(200);
  return threatCategories;
}

// AI Analysis simulation - structured defensive assistant
export async function analyzeAlert(id: string): Promise<AIAnalysis> {
  await delay(1200);
  const alert = alerts.find(a=>a.id===id);
  if (!alert) throw new Error('Alert not found');

  // Deterministic analysis based on alert type to avoid hallucinating
  const analysisMap: Record<string, Partial<AIAnalysis>> = {
    BRUTE_FORCE: {
      whatHappened: `Observed ${alert.evidence.indicators[0] || 'multiple authentication failures'} targeting ${alert.destinationIp}. The activity originated from ${alert.sourceIp} and was detected by ${alert.sensor}.`,
      whySuspicious: `Authentication failures clustered in short time window (${alert.evidence.indicators.slice(1,3).join(', ')}). This pattern is consistent with automated credential guessing, not normal user behavior. Source has no prior legitimate access history in available telemetry.`,
      riskAssessment: `Risk score ${alert.riskScore}/100 - ${alert.severity}. HIGH severity because administrative account is targeted. If successful, could lead to privilege escalation. No successful authentication confirmed in provided evidence.`,
      potentialImpact: `If attacker gains access: account takeover, lateral movement, data access, persistence. Current evidence shows attempt, not compromise. Impact remains potential until successful login is confirmed.`,
      recommendedActions: [
        'Verify whether this activity was authorized testing or expected automation',
        'Review authentication logs for any successful logins from same source',
        'Check if targeted account shows signs of compromise (new sessions, config changes)',
        'Block source IP at firewall/WAF if not authorized',
        'Enforce MFA and review password policy for targeted account',
        'Continue monitoring for related activity from same source or toward same asset'
      ],
      observedEvidence: alert.evidence.indicators,
      inference: ['Pattern suggests automated tooling', 'Targeting suggests reconnaissance of admin accounts', 'No evidence of successful compromise in current telemetry'],
    },
    NETWORK_SCAN: {
      whatHappened: `Port scanning activity detected from ${alert.sourceIp} toward ${alert.destinationIp} and potentially other hosts. Sensor ${alert.sensor} flagged sequential probing.`,
      whySuspicious: `Systematic probing of multiple ports/hosts is not typical of normal application traffic. The scan pattern (sequential, high port diversity) matches reconnaissance tooling.`,
      riskAssessment: `Risk ${alert.riskScore}/100 - ${alert.severity}. Reconnaissance phase often precedes exploitation. No exploitation observed yet, but indicates interest in infrastructure.`,
      potentialImpact: `Information gathering about open services could enable targeted exploitation. No direct impact yet, but increases future attack likelihood.`,
      recommendedActions: [
        'Confirm whether source is authorized scanner or security testing',
        'Review firewall logs for follow-up exploitation attempts',
        'Ensure only necessary ports are exposed on target assets',
        'Consider blocking or rate-limiting source if unauthorized',
        'Validate that intrusion detection signatures are up to date'
      ],
      observedEvidence: alert.evidence.indicators,
      inference: ['Likely reconnaissance', 'May be precursor to targeted attack', 'No exploitation evidence in current data'],
    }
  };

  const base = analysisMap[alert.type] || {
    whatHappened: `Security event: ${alert.title} detected on ${alert.destinationIp} from ${alert.sourceIp}.`,
    whySuspicious: alert.evidence.description,
    riskAssessment: `Risk ${alert.riskScore}/100 - ${alert.severity}. Based on provided evidence, activity deviates from baseline.`,
    potentialImpact: `Potential impact depends on whether activity is malicious and successful. Current evidence indicates suspicious behavior requiring investigation.`,
    recommendedActions: alert.recommendation || ['Review logs', 'Verify authorization', 'Monitor'],
    observedEvidence: alert.evidence.indicators,
    inference: ['Suspicious pattern observed', 'Requires further investigation'],
  };

  const fullAnalysis: AIAnalysis = {
    whatHappened: base.whatHappened!,
    whySuspicious: base.whySuspicious!,
    riskAssessment: base.riskAssessment!,
    potentialImpact: base.potentialImpact!,
    recommendedActions: base.recommendedActions!,
    confidence: Math.min(95, 60 + Math.floor(alert.riskScore*0.35)),
    observedEvidence: base.observedEvidence!,
    inference: base.inference!,
    timestamp: new Date().toISOString(),
  };

  // Save to alert
  const idx = alerts.findIndex(a=>a.id===id);
  if (idx >=0) {
    alerts[idx] = { ...alerts[idx], aiAnalysis: fullAnalysis };
  }

  return fullAnalysis;
}

export async function updateIncidentStatus(id: string, status: Incident['status'], note?: string): Promise<Incident> {
  await delay(400);
  const idx = incidents.findIndex(i=>i.id===id);
  if (idx <0) throw new Error('Incident not found');
  const incident = incidents[idx];
  const newEvent = {
    id: `TL-${Date.now()}`,
    timestamp: new Date().toISOString(),
    title: `Status changed to ${status}`,
    description: note || `Incident moved to ${status}`,
    type: status === 'CONTAINED' ? 'CONTAINMENT' as const : status === 'RESOLVED' ? 'RESOLUTION' as const : 'NOTE' as const,
    actor: 'Analyst'
  };
  const updated = {
    ...incident,
    status,
    updatedAt: new Date().toISOString(),
    timeline: [...incident.timeline, newEvent],
    notes: note ? `${incident.notes}\n[${new Date().toLocaleTimeString()}] ${note}` : incident.notes
  };
  incidents[idx] = updated;
  return updated;
}

export async function createIncidentFromAlert(alertId: string): Promise<Incident> {
  await delay(500);
  const alert = alerts.find(a=>a.id===alertId);
  if (!alert) throw new Error('Alert not found');
  const newIncident: Incident = {
    id: `INC-${String(Math.floor(1000+Math.random()*9000)).padStart(4,'0')}`,
    title: alert.title,
    severity: alert.severity,
    riskScore: alert.riskScore,
    status: 'NEW',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    affectedAssets: alert.assetId ? [alert.assetId] : [],
    relatedAlerts: [alert.id],
    description: alert.description,
    notes: `Created from alert ${alert.id}`,
    timeline: [
      { id: `TL-${Date.now()}`, timestamp: new Date().toISOString(), title: 'Incident created from alert', description: `Source alert ${alert.id}`, type: 'DETECTION' }
    ],
    isSimulation: alert.isSimulation
  };
  incidents.unshift(newIncident);
  // update alert status
  const aIdx = alerts.findIndex(a=>a.id===alertId);
  if (aIdx>=0) alerts[aIdx].status = 'INVESTIGATING';
  return newIncident;
}

// Simulation engine hooks
export function addSimulatedAlert(alert: Alert) {
  alerts.unshift(alert);
  securityEvents.unshift({
    id: `EVT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: alert.type,
    severity: alert.severity,
    source: alert.sourceIp,
    destination: alert.destinationIp,
    description: alert.title,
    risk: alert.riskScore,
    isSimulation: true
  });
  securityScore = Math.max(20, securityScore - (alert.severity==='CRITICAL'?12: alert.severity==='HIGH'?7: alert.severity==='MEDIUM'?4:1));
}

export function addSimulatedEvent(event: SecurityEvent) {
  securityEvents.unshift(event);
}

export function resetSimulation() {
  alerts = [...mockAlerts];
  incidents = [...mockIncidents];
  securityEvents = [...mockSecurityEvents];
  securityScore = mockDashboardStats.securityScore;
}

export function getCurrentSecurityScore() {
  return securityScore;
}

// For real-time simulation
export type RealTimeCallback = (type: 'new-alert' | 'new-event' | 'score-update', data: any) => void;
let rtCallbacks: RealTimeCallback[] = [];
export function subscribeRealTime(cb: RealTimeCallback) {
  rtCallbacks.push(cb);
  return () => { rtCallbacks = rtCallbacks.filter(c=>c!==cb); };
}
export function emitRealTime(type: 'new-alert' | 'new-event' | 'score-update', data: any) {
  rtCallbacks.forEach(cb=>cb(type, data));
}
