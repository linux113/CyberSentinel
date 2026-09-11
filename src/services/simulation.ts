import { Alert, SecurityEvent, Severity, ThreatType } from '../lib/types';
import { addSimulatedAlert, addSimulatedEvent, emitRealTime } from './api';

const randomIp = () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
const internalIp = () => `192.168.${10+Math.floor(Math.random()*15)}.${Math.floor(Math.random()*200)+1}`;

const simulationTemplates: Array<{ title: string; type: ThreatType; severity: Severity; risk: number; desc: string; indicators: string[]; signature: string; }> = [
  {
    title: 'Port Scanning Detected',
    type: 'NETWORK_SCAN',
    severity: 'MEDIUM',
    risk: 62,
    desc: 'Host performing systematic port scanning across internal network.',
    indicators: ['SYN scan', '200+ ports', '15 hosts', 'NMAP signature'],
    signature: 'ET SCAN NMAP -sS'
  },
  {
    title: 'Possible Brute Force Attack',
    type: 'BRUTE_FORCE',
    severity: 'HIGH',
    risk: 87,
    desc: 'Multiple authentication attempts from same source in short interval.',
    indicators: ['147 failed attempts', 'Admin targeting', 'Short window', 'Multiple ports'],
    signature: 'ET SCAN Potential SSH Scan'
  },
  {
    title: 'Suspicious Authentication Activity',
    type: 'SUSPICIOUS_LOGIN',
    severity: 'HIGH',
    risk: 85,
    desc: 'Login from unusual location and time.',
    indicators: ['Unusual hour', 'New geo', 'First device', 'VPN bypass'],
    signature: 'AUTH Anomaly'
  },
  {
    title: 'Critical Vulnerability Exploitation Attempt',
    type: 'VULNERABILITY',
    severity: 'CRITICAL',
    risk: 94,
    desc: 'Exploit attempt for critical RCE CVE.',
    indicators: ['CVE pattern', 'RCE payload', 'Vulnerable version', 'Public exploit'],
    signature: 'ET EXPLOIT CVE'
  },
  {
    title: 'Malware C2 Communication',
    type: 'MALWARE',
    severity: 'CRITICAL',
    risk: 91,
    desc: 'Beaconing pattern consistent with C2.',
    indicators: ['60s beacon', 'Jitter', 'DNS tunneling', 'Bad domain'],
    signature: 'ET MALWARE CobaltStrike'
  },
  {
    title: 'Potential Data Exfiltration',
    type: 'DATA_EXFILTRATION',
    severity: 'CRITICAL',
    risk: 89,
    desc: 'Large outbound transfer to unknown host.',
    indicators: ['2.4GB', 'Unknown dest', 'Off-hours', 'Encrypted'],
    signature: 'ET POLICY Large Outbound'
  },
  {
    title: 'Web Application Attack',
    type: 'WEB_ATTACK',
    severity: 'HIGH',
    risk: 78,
    desc: 'SQL injection payload detected.',
    indicators: ['SQL keywords', 'Encoded', 'Admin path', 'WAF bypass'],
    signature: 'ET WEB_SERVER SQLi'
  },
  {
    title: 'Anomalous Network Behavior',
    type: 'ANOMALY',
    severity: 'MEDIUM',
    risk: 54,
    desc: 'Traffic 400% above baseline.',
    indicators: ['400% baseline', 'Unusual dest', 'DB asset', 'Late night'],
    signature: 'Anomaly ML'
  }
];

export function simulateThreat(type?: ThreatType): Alert {
  const template = type 
    ? simulationTemplates.find(t=>t.type===type) || simulationTemplates[0]
    : simulationTemplates[Math.floor(Math.random()*simulationTemplates.length)];
  
  const id = `ALR-${Date.now().toString().slice(-5)}`;
  const now = new Date().toISOString();
  const src = randomIp();
  const dst = internalIp();
  
  const alert: Alert = {
    id,
    title: template.title,
    type: template.type,
    severity: template.severity,
    riskScore: template.risk,
    sourceIp: src,
    destinationIp: dst,
    sourcePort: 40000 + Math.floor(Math.random()*20000),
    destinationPort: [80,443,22,3389,5432][Math.floor(Math.random()*5)],
    protocol: ['TCP','HTTP','HTTPS'][Math.floor(Math.random()*3)],
    sensor: 'Suricata',
    description: template.desc,
    signature: template.signature,
    timestamp: now,
    status: 'NEW',
    isSimulation: true,
    evidence: {
      description: template.desc,
      indicators: template.indicators,
      rawLogSnippet: `${now} [${template.signature}] ${src} -> ${dst} ${template.desc} [SIMULATION]`
    },
    recommendation: [
      'Verify whether activity was authorized',
      'Review logs for related activity',
      'Consider blocking source if malicious',
      'Monitor affected asset'
    ]
  };

  addSimulatedAlert(alert);
  emitRealTime('new-alert', alert);
  
  return alert;
}

export function simulateEvent(): SecurityEvent {
  const template = simulationTemplates[Math.floor(Math.random()*simulationTemplates.length)];
  const event: SecurityEvent = {
    id: `EVT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    type: template.type,
    severity: template.severity,
    source: randomIp(),
    destination: internalIp(),
    description: template.title,
    risk: template.risk,
    isSimulation: true
  };
  addSimulatedEvent(event);
  emitRealTime('new-event', event);
  return event;
}

// Auto-simulation loop for demo mode
let intervalId: number | null = null;
export function startAutoSimulation(callback?: (alert: Alert) => void) {
  if (intervalId) return;
  intervalId = window.setInterval(() => {
    if (Math.random() > 0.6) {
      const alert = simulateThreat();
      callback?.(alert);
    } else {
      simulateEvent();
    }
  }, 8000) as unknown as number;
}

export function stopAutoSimulation() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
