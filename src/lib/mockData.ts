import { Alert, Asset, Incident, Vulnerability, SecurityEvent, DashboardStats, ThreatType, Severity } from './types';

const randomIp = () => {
  const internal = Math.random() > 0.3;
  if (internal) return `192.168.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
  return `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*254)+1}`;
};

const threatTypes: ThreatType[] = ['NETWORK_SCAN', 'BRUTE_FORCE', 'MALWARE', 'WEB_ATTACK', 'SUSPICIOUS_LOGIN', 'VULNERABILITY', 'DATA_EXFILTRATION', 'ANOMALY'];
const severities: Severity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

export const mockAssets: Asset[] = [
  { id: 'AST-001', name: 'WEB-SERVER-01', type: 'SERVER', ip: '192.168.10.10', os: 'Ubuntu 22.04 LTS', status: 'CRITICAL', riskScore: 84, vulnerabilities: 3, activeAlerts: 4, lastSeen: new Date(Date.now()-60000).toISOString(), openPorts: [80,443,22], tags: ['production', 'web'] },
  { id: 'AST-002', name: 'DB-01', type: 'DATABASE', ip: '192.168.10.20', os: 'PostgreSQL 15', status: 'WARNING', riskScore: 62, vulnerabilities: 2, activeAlerts: 2, lastSeen: new Date(Date.now()-120000).toISOString(), openPorts: [5432,22], tags: ['production', 'database'] },
  { id: 'AST-003', name: 'EMP-PC-042', type: 'ENDPOINT', ip: '192.168.20.45', os: 'Windows 11 Pro', status: 'WARNING', riskScore: 37, vulnerabilities: 1, activeAlerts: 1, lastSeen: new Date(Date.now()-300000).toISOString(), openPorts: [3389,135], tags: ['endpoint', 'finance'] },
  { id: 'AST-004', name: 'FIREWALL-01', type: 'NETWORK', ip: '192.168.1.1', os: 'pfSense 2.7', status: 'HEALTHY', riskScore: 21, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-10000).toISOString(), openPorts: [443,22], tags: ['network', 'perimeter'] },
  { id: 'AST-005', name: 'APP-SRV-02', type: 'APPLICATION', ip: '192.168.10.12', os: 'Node.js 20 / Linux', status: 'HEALTHY', riskScore: 18, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-60000).toISOString(), openPorts: [3000,443], tags: ['production'] },
  { id: 'AST-006', name: 'ADMIN-PORTAL', type: 'APPLICATION', ip: '192.168.10.15', os: 'Nginx 1.24', status: 'CRITICAL', riskScore: 91, vulnerabilities: 4, activeAlerts: 6, lastSeen: new Date(Date.now()-30000).toISOString(), openPorts: [443,80], tags: ['critical', 'admin'] },
  { id: 'AST-007', name: 'FILE-SERVER', type: 'SERVER', ip: '192.168.10.30', os: 'Windows Server 2022', status: 'HEALTHY', riskScore: 12, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-180000).toISOString(), openPorts: [445,139,22], tags: ['internal'] },
  { id: 'AST-008', name: 'VPN-GW', type: 'NETWORK', ip: '192.168.1.10', os: 'OpenVPN', status: 'WARNING', riskScore: 45, vulnerabilities: 1, activeAlerts: 1, lastSeen: new Date(Date.now()-90000).toISOString(), openPorts: [1194,443], tags: ['network', 'vpn'] },
  { id: 'AST-009', name: 'DEV-PC-11', type: 'ENDPOINT', ip: '192.168.20.22', os: 'macOS 14', status: 'HEALTHY', riskScore: 15, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-240000).toISOString(), openPorts: [], tags: ['dev'] },
  { id: 'AST-010', name: 'K8S-CLUSTER', type: 'CLOUD', ip: '10.0.1.5', os: 'K3s v1.29', status: 'WARNING', riskScore: 54, vulnerabilities: 2, activeAlerts: 2, lastSeen: new Date(Date.now()-60000).toISOString(), openPorts: [6443,443], tags: ['cloud', 'k8s'] },
  { id: 'AST-011', name: 'MAIL-SRV', type: 'SERVER', ip: '192.168.10.25', os: 'Ubuntu 20.04', status: 'HEALTHY', riskScore: 28, vulnerabilities: 1, activeAlerts: 0, lastSeen: new Date(Date.now()-120000).toISOString(), openPorts: [25,587,993], tags: ['mail'] },
  { id: 'AST-012', name: 'SIEM-COLLECTOR', type: 'SERVER', ip: '192.168.10.100', os: 'Debian 12', status: 'HEALTHY', riskScore: 8, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-5000).toISOString(), openPorts: [514,9200], tags: ['security', 'siem'] },
  { id: 'AST-013', name: 'HR-PC-07', type: 'ENDPOINT', ip: '192.168.20.88', os: 'Windows 10', status: 'CRITICAL', riskScore: 78, vulnerabilities: 3, activeAlerts: 3, lastSeen: new Date(Date.now()-60000).toISOString(), openPorts: [135,445], tags: ['hr'] },
  { id: 'AST-014', name: 'BACKUP-SRV', type: 'SERVER', ip: '192.168.10.40', os: 'TrueNAS', status: 'HEALTHY', riskScore: 19, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-300000).toISOString(), openPorts: [22,443], tags: ['backup'] },
  { id: 'AST-015', name: 'WAF-01', type: 'NETWORK', ip: '192.168.1.5', os: 'ModSecurity', status: 'HEALTHY', riskScore: 22, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-15000).toISOString(), openPorts: [80,443], tags: ['waf'] },
  { id: 'AST-016', name: 'API-GW-01', type: 'APPLICATION', ip: '192.168.10.18', os: 'Kong 3.4', status: 'WARNING', riskScore: 48, vulnerabilities: 2, activeAlerts: 1, lastSeen: new Date(Date.now()-45000).toISOString(), openPorts: [8000,8443], tags: ['api'] },
  { id: 'AST-017', name: 'JENKINS', type: 'SERVER', ip: '192.168.10.50', os: 'Ubuntu 22.04', status: 'WARNING', riskScore: 66, vulnerabilities: 3, activeAlerts: 2, lastSeen: new Date(Date.now()-80000).toISOString(), openPorts: [8080,22], tags: ['ci/cd'] },
  { id: 'AST-018', name: 'ENDPOINT-CEO', type: 'ENDPOINT', ip: '192.168.20.5', os: 'macOS 14', status: 'HEALTHY', riskScore: 9, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-20000).toISOString(), openPorts: [], tags: ['executive'] },
  { id: 'AST-019', name: 'REDIS-01', type: 'DATABASE', ip: '192.168.10.21', os: 'Redis 7.2', status: 'HEALTHY', riskScore: 14, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date(Date.now()-60000).toISOString(), openPorts: [6379], tags: ['cache'] },
  { id: 'AST-020', name: 'CLOUD-STORAGE', type: 'CLOUD', ip: '10.0.2.10', os: 'MinIO', status: 'HEALTHY', riskScore: 26, vulnerabilities: 1, activeAlerts: 0, lastSeen: new Date(Date.now()-120000).toISOString(), openPorts: [9000,9001], tags: ['storage'] },
];

const alertTemplates = [
  {
    title: 'Possible Brute Force Attack',
    type: 'BRUTE_FORCE' as ThreatType,
    description: 'Multiple authentication attempts were observed from the same source within a short time interval.',
    signature: 'ET SCAN Potential SSH Scan',
    evidence: {
      description: '147 failed login attempts targeting admin account from single source in 3 minutes',
      indicators: ['147 failed attempts', 'Single source IP', 'Targeting admin', 'Short time window', 'Multiple ports attempted']
    }
  },
  {
    title: 'Port Scanning Detected',
    type: 'NETWORK_SCAN' as ThreatType,
    description: 'Host is performing systematic port scanning across internal network.',
    signature: 'ET SCAN NMAP -sS Scan',
    evidence: {
      description: 'SYN packets sent to 200+ ports across 15 hosts in 45 seconds',
      indicators: ['High port diversity', 'Sequential scanning pattern', 'Low TTL variance', 'NMAP signature']
    }
  },
  {
    title: 'Suspicious Authentication Activity',
    type: 'SUSPICIOUS_LOGIN' as ThreatType,
    description: 'Authentication from unusual location and time outside business hours.',
    signature: 'AUTH Anomaly Detection',
    evidence: {
      description: 'Login at 03:14 AM from previously unseen geolocation',
      indicators: ['Unusual hour', 'New geolocation', 'First time device', 'VPN bypass attempt']
    }
  },
  {
    title: 'Web Application Attack Attempt',
    type: 'WEB_ATTACK' as ThreatType,
    description: 'SQL injection payload detected in HTTP request parameters.',
    signature: 'ET WEB_SERVER SQL Injection Attempt',
    evidence: {
      description: 'SQLi payload: UNION SELECT detected in /admin/login',
      indicators: ['SQL keywords', 'Encoded payload', 'Admin path targeting', 'WAF bypass attempt']
    }
  },
  {
    title: 'Potential Data Exfiltration',
    type: 'DATA_EXFILTRATION' as ThreatType,
    description: 'Large outbound transfer to unknown external host.',
    signature: 'ET POLICY Large Outbound Transfer',
    evidence: {
      description: '2.4GB transferred to external IP via HTTPS in 12 minutes',
      indicators: ['Large volume', 'Unknown destination', 'Off-hours', 'Encrypted channel']
    }
  },
  {
    title: 'Malware C2 Communication',
    type: 'MALWARE' as ThreatType,
    description: 'Beaconing pattern consistent with known malware C2.',
    signature: 'ET MALWARE CobaltStrike Beacon',
    evidence: {
      description: 'Periodic 60s beacon to external domain with jitter',
      indicators: ['Regular intervals', 'Small payload', 'DNS tunneling signs', 'Known bad domain pattern']
    }
  },
  {
    title: 'Critical Vulnerability Exploitation Attempt',
    type: 'VULNERABILITY' as ThreatType,
    description: 'Exploit attempt for CVE-2024-XXXX detected.',
    signature: 'ET EXPLOIT Possible CVE Exploit',
    evidence: {
      description: 'Payload matching public exploit for critical RCE',
      indicators: ['CVE pattern', 'RCE payload', 'Targeting vulnerable version', 'Public exploit match']
    }
  },
  {
    title: 'Anomalous Network Behavior',
    type: 'ANOMALY' as ThreatType,
    description: 'Traffic volume 400% above baseline for this asset.',
    signature: 'Anomaly Detection ML Model',
    evidence: {
      description: 'Outbound traffic spike from database server',
      indicators: ['400% above baseline', 'Unusual destination', 'Database asset', 'Late night']
    }
  }
];

function generateAlerts(count: number): Alert[] {
  const alerts: Alert[] = [];
  for (let i = 0; i < count; i++) {
    const template = alertTemplates[Math.floor(Math.random()*alertTemplates.length)];
    const severityRoll = Math.random();
    let severity: Severity = 'MEDIUM';
    let risk = 45 + Math.floor(Math.random()*40);
    if (severityRoll > 0.85) { severity = 'CRITICAL'; risk = 85 + Math.floor(Math.random()*15); }
    else if (severityRoll > 0.6) { severity = 'HIGH'; risk = 65 + Math.floor(Math.random()*20); }
    else if (severityRoll > 0.25) { severity = 'MEDIUM'; risk = 35 + Math.floor(Math.random()*25); }
    else { severity = 'LOW'; risk = 10 + Math.floor(Math.random()*25); }

    const asset = mockAssets[Math.floor(Math.random()*mockAssets.length)];
    const minutesAgo = Math.floor(Math.random()*1440);
    const timestamp = new Date(Date.now() - minutesAgo*60000).toISOString();

    alerts.push({
      id: `ALR-${String(10000 + i).padStart(5,'0')}`,
      title: template.title,
      type: template.type,
      severity,
      riskScore: risk,
      sourceIp: randomIp(),
      destinationIp: asset.ip,
      sourcePort: Math.floor(Math.random()*60000)+1024,
      destinationPort: asset.openPorts[0] || 80,
      protocol: ['TCP','UDP','HTTP','HTTPS'][Math.floor(Math.random()*4)],
      sensor: ['Suricata','WAF','EDR','Firewall','Auth Log'][Math.floor(Math.random()*5)],
      description: template.description,
      signature: template.signature,
      timestamp,
      status: (['NEW','INVESTIGATING','CONTAINED','RESOLVED'] as any)[Math.floor(Math.random()*4)],
      assetId: asset.id,
      evidence: {
        description: template.evidence.description,
        indicators: template.evidence.indicators,
        rawLogSnippet: `${timestamp} [${template.signature}] ${randomIp()}:${Math.floor(Math.random()*60000)} -> ${asset.ip}:${asset.openPorts[0] || 80} ${template.description}`
      },
      recommendation: [
        'Verify whether the activity was authorized',
        'Review authentication and access logs',
        'Isolate affected asset if necessary',
        'Apply appropriate authentication protections',
        'Continue monitoring for related activity'
      ]
    });
  }
  return alerts.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const mockAlerts: Alert[] = generateAlerts(54);

export const mockIncidents: Incident[] = [
  {
    id: 'INC-0042',
    title: 'Possible Brute Force on Admin Portal',
    severity: 'HIGH',
    riskScore: 87,
    status: 'INVESTIGATING',
    assignedTo: 'Alex Rivera',
    createdAt: new Date(Date.now()-1000*60*12).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*2).toISOString(),
    affectedAssets: ['AST-006', 'AST-001'],
    relatedAlerts: [mockAlerts[0]?.id, mockAlerts[3]?.id].filter(Boolean) as string[],
    description: 'Multiple brute force attempts targeting admin portal, potential credential stuffing.',
    notes: 'Checking if MFA was bypassed. No successful login confirmed yet.',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*12).toISOString(), title: 'Suspicious login detected', description: '147 failed attempts observed', type: 'DETECTION' },
      { id: 't2', timestamp: new Date(Date.now()-1000*60*10).toISOString(), title: 'Related events identified', description: 'Correlated with port scan from same source', type: 'ANALYSIS' },
      { id: 't3', timestamp: new Date(Date.now()-1000*60*8).toISOString(), title: 'Analyst assigned', description: 'Assigned to Alex Rivera', type: 'ASSIGNMENT', actor: 'System' },
      { id: 't4', timestamp: new Date(Date.now()-1000*60*5).toISOString(), title: 'AI analysis completed', description: 'High-risk suspicious authentication', type: 'ANALYSIS' },
      { id: 't5', timestamp: new Date(Date.now()-1000*60*2).toISOString(), title: 'Containment recommended', description: 'Block source IP and enforce MFA', type: 'ACTION' },
    ]
  },
  {
    id: 'INC-0041',
    title: 'Port Scanning from External Host',
    severity: 'MEDIUM',
    riskScore: 62,
    status: 'NEW',
    createdAt: new Date(Date.now()-1000*60*45).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*30).toISOString(),
    affectedAssets: ['AST-001','AST-004'],
    relatedAlerts: [mockAlerts[1]?.id].filter(Boolean) as string[],
    description: 'External host scanning web infrastructure.',
    notes: '',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*45).toISOString(), title: 'Port scan detected', description: 'Suricata flagged NMAP pattern', type: 'DETECTION' },
    ]
  },
  {
    id: 'INC-0040',
    title: 'Critical Vulnerability on WEB-SERVER-01',
    severity: 'CRITICAL',
    riskScore: 94,
    status: 'CONTAINED',
    assignedTo: 'Sam Chen',
    createdAt: new Date(Date.now()-1000*60*120).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*15).toISOString(),
    affectedAssets: ['AST-001'],
    relatedAlerts: [],
    description: 'RCE vulnerability CVE-2024-3400 detected, patch required.',
    notes: 'WAF rule applied as temporary mitigation. Patch scheduled.',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*120).toISOString(), title: 'Vulnerability discovered', description: 'Scanner found critical CVE', type: 'DETECTION' },
      { id: 't2', timestamp: new Date(Date.now()-1000*60*90).toISOString(), title: 'WAF mitigation applied', description: 'Temporary rule blocking exploit path', type: 'CONTAINMENT' },
    ]
  },
  {
    id: 'INC-0039',
    title: 'Data Exfiltration Attempt - FILE-SERVER',
    severity: 'CRITICAL',
    riskScore: 91,
    status: 'INVESTIGATING',
    assignedTo: 'Jordan Park',
    createdAt: new Date(Date.now()-1000*60*200).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*20).toISOString(),
    affectedAssets: ['AST-007'],
    relatedAlerts: [],
    description: 'Large outbound transfer detected, possible exfiltration.',
    notes: 'Investigating user account involved. Transfer blocked.',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*200).toISOString(), title: 'Large outbound transfer', description: '2.4GB to unknown host', type: 'DETECTION' },
      { id: 't2', timestamp: new Date(Date.now()-1000*60*180).toISOString(), title: 'Transfer blocked', description: 'Firewall rule added', type: 'CONTAINMENT' },
    ]
  },
  {
    id: 'INC-0038',
    title: 'Malware Beaconing - HR-PC-07',
    severity: 'HIGH',
    riskScore: 82,
    status: 'NEW',
    createdAt: new Date(Date.now()-1000*60*300).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*300).toISOString(),
    affectedAssets: ['AST-013'],
    relatedAlerts: [],
    description: 'Endpoint showing C2 beaconing pattern.',
    notes: '',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*300).toISOString(), title: 'Beaconing detected', description: '60s interval to suspicious domain', type: 'DETECTION' },
    ]
  }
];

// Add more incidents to reach 15
for (let i = 5; i < 15; i++) {
  const sev: Severity = (['CRITICAL','HIGH','MEDIUM','LOW'] as Severity[])[Math.floor(Math.random()*4)];
  const risk = sev === 'CRITICAL' ? 85+Math.floor(Math.random()*15) : sev === 'HIGH' ? 65+Math.floor(Math.random()*20) : sev === 'MEDIUM' ? 40+Math.floor(Math.random()*20) : 20+Math.floor(Math.random()*20);
  mockIncidents.push({
    id: `INC-${String(38-i).padStart(4,'0')}`,
    title: alertTemplates[Math.floor(Math.random()*alertTemplates.length)].title,
    severity: sev,
    riskScore: risk,
    status: (['NEW','INVESTIGATING','CONTAINED','RESOLVED','CLOSED'] as any)[Math.floor(Math.random()*5)],
    assignedTo: ['Alex Rivera','Sam Chen','Jordan Park', undefined][Math.floor(Math.random()*4)],
    createdAt: new Date(Date.now()-1000*60*60* (i*2)).toISOString(),
    updatedAt: new Date(Date.now()-1000*60*30*i).toISOString(),
    affectedAssets: [mockAssets[Math.floor(Math.random()*mockAssets.length)].id],
    relatedAlerts: [mockAlerts[i]?.id].filter(Boolean) as string[],
    description: 'Auto-generated incident for simulation',
    notes: '',
    timeline: [
      { id: 't1', timestamp: new Date(Date.now()-1000*60*60* (i*2)).toISOString(), title: 'Incident created', description: 'From alert correlation', type: 'DETECTION' }
    ]
  });
}

export const mockVulnerabilities: Vulnerability[] = [
  { id: 'VULN-001', name: 'Critical RCE in Web Server', asset: 'WEB-SERVER-01', assetId: 'AST-001', severity: 'CRITICAL', cvss: 9.8, description: 'Remote code execution vulnerability in Apache HTTP Server version 2.4.49. Allows path traversal and remote code execution.', impact: 'Full system compromise, data breach, lateral movement', remediation: 'Update Apache to 2.4.51 or later, apply WAF rules blocking traversal patterns', status: 'OPEN', detectedAt: new Date(Date.now()-1000*60*60*5).toISOString(), cve: 'CVE-2021-41773' },
  { id: 'VULN-002', name: 'SQL Injection in Admin Portal', asset: 'ADMIN-PORTAL', assetId: 'AST-006', severity: 'CRITICAL', cvss: 9.1, description: 'Unsanitized input in login form allows SQL injection.', impact: 'Authentication bypass, data exfiltration', remediation: 'Implement parameterized queries, input validation', status: 'OPEN', detectedAt: new Date(Date.now()-1000*60*60*2).toISOString(), cve: 'CVE-2024-1234' },
  { id: 'VULN-003', name: 'Outdated OpenSSL', asset: 'DB-01', assetId: 'AST-002', severity: 'HIGH', cvss: 7.5, description: 'OpenSSL version vulnerable to buffer overflow.', impact: 'Denial of service, potential RCE', remediation: 'Update OpenSSL to 3.0.12', status: 'OPEN', detectedAt: new Date(Date.now()-1000*60*60*24).toISOString(), cve: 'CVE-2023-4807' },
  { id: 'VULN-004', name: 'Weak SSH Configuration', asset: 'WEB-SERVER-01', assetId: 'AST-001', severity: 'MEDIUM', cvss: 5.3, description: 'SSH allows password authentication and root login.', impact: 'Brute force risk', remediation: 'Disable root login, enforce key-based auth', status: 'OPEN', detectedAt: new Date(Date.now()-1000*60*60*48).toISOString() },
];

for (let i = 5; i < 32; i++) {
  const severities: any[] = ['CRITICAL','HIGH','MEDIUM','LOW'];
  const sev = severities[Math.floor(Math.random()*4)];
  const cvss = sev === 'CRITICAL' ? 9+Math.random() : sev === 'HIGH' ? 7+Math.random()*2 : sev === 'MEDIUM' ? 4+Math.random()*3 : Math.random()*4;
  const asset = mockAssets[Math.floor(Math.random()*mockAssets.length)];
  mockVulnerabilities.push({
    id: `VULN-${String(i).padStart(3,'0')}`,
    name: `${['Outdated','Misconfigured','Unpatched'][Math.floor(Math.random()*3)]} ${['Nginx','Apache','OpenSSL','PostgreSQL','Redis','Linux Kernel'][Math.floor(Math.random()*6)]} ${['Component','Service','Library'][Math.floor(Math.random()*3)]}`,
    asset: asset.name,
    assetId: asset.id,
    severity: sev,
    cvss: Number(cvss.toFixed(1)),
    description: 'Vulnerability detected by scanner. Requires review and remediation.',
    impact: 'Potential system compromise or information disclosure',
    remediation: 'Update affected component to latest secure version',
    status: (['OPEN','PATCHED','MITIGATED'] as any)[Math.floor(Math.random()*3)],
    detectedAt: new Date(Date.now()-1000*60*60*24*Math.random()*7).toISOString(),
    cve: `CVE-2024-${Math.floor(1000+Math.random()*9000)}`
  });
}

export const mockSecurityEvents: SecurityEvent[] = [];
for (let i = 0; i < 120; i++) {
  const sev = severities[Math.floor(Math.random()*4)];
  const type = threatTypes[Math.floor(Math.random()*threatTypes.length)];
  const risk = sev === 'CRITICAL' ? 85+Math.floor(Math.random()*15) : sev === 'HIGH' ? 65+Math.floor(Math.random()*20) : sev === 'MEDIUM' ? 35+Math.floor(Math.random()*25) : 10+Math.floor(Math.random()*30);
  const mins = Math.floor(Math.random()*1440*3);
  mockSecurityEvents.push({
    id: `EVT-${String(100000+i).padStart(6,'0')}`,
    timestamp: new Date(Date.now()-mins*60000).toISOString(),
    type,
    severity: sev,
    source: randomIp(),
    destination: mockAssets[Math.floor(Math.random()*mockAssets.length)].ip,
    description: `${type.replace('_',' ')} detected from ${randomIp()}`,
    risk
  });
}

export const mockDashboardStats: DashboardStats = {
  securityScore: 82,
  previousScore: 76,
  scoreChange: 6,
  lastUpdated: new Date().toISOString(),
  threatCounts: {
    critical: mockAlerts.filter(a=>a.severity==='CRITICAL' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length,
    high: mockAlerts.filter(a=>a.severity==='HIGH' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length,
    medium: mockAlerts.filter(a=>a.severity==='MEDIUM' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length,
    low: mockAlerts.filter(a=>a.severity==='LOW' && a.status !== 'RESOLVED' && a.status !== 'CLOSED').length,
  },
  activeIncidents: mockIncidents.filter(i=>i.status !== 'RESOLVED' && i.status !== 'CLOSED').length,
  activeThreats: mockAlerts.filter(a=>a.status === 'NEW' || a.status === 'INVESTIGATING').length,
  assetsMonitored: mockAssets.length,
  vulnerabilities: {
    critical: mockVulnerabilities.filter(v=>v.severity==='CRITICAL' && v.status==='OPEN').length,
    high: mockVulnerabilities.filter(v=>v.severity==='HIGH' && v.status==='OPEN').length,
    medium: mockVulnerabilities.filter(v=>v.severity==='MEDIUM' && v.status==='OPEN').length,
    low: mockVulnerabilities.filter(v=>v.severity==='LOW' && v.status==='OPEN').length,
  }
};

export const threatActivityByHour = Array.from({length: 24}, (_, i) => ({
  time: `${String(i).padStart(2,'0')}:00`,
  critical: Math.floor(Math.random()*5),
  high: Math.floor(Math.random()*8)+1,
  medium: Math.floor(Math.random()*12)+2,
  low: Math.floor(Math.random()*15)+3,
}));

export const threatCategories = [
  { name: 'Network Scan', value: 18, color: '#3b82f6' },
  { name: 'Brute Force', value: 22, color: '#f97316' },
  { name: 'Malware', value: 8, color: '#ef4444' },
  { name: 'Web Attack', value: 15, color: '#eab308' },
  { name: 'Suspicious Login', value: 19, color: '#8b5cf6' },
  { name: 'Vulnerability', value: 10, color: '#06b6d4' },
  { name: 'Data Exfiltration', value: 4, color: '#ec4899' },
  { name: 'Anomaly', value: 12, color: '#22c55e' },
];
