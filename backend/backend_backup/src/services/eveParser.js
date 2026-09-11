// Transforms Suricata EVE JSON to CyberSentinel Alert model
import { v4 as uuid } from 'uuid';

function mapSeverity(suricataSeverity) {
  // Suricata: 1=highest, 3=lowest
  if (suricataSeverity === 1) return 'CRITICAL';
  if (suricataSeverity === 2) return 'HIGH';
  if (suricataSeverity === 3) return 'MEDIUM';
  return 'LOW';
}

function mapType(signature, category) {
  const sig = (signature + ' ' + category).toLowerCase();
  if (sig.includes('scan') || sig.includes('nmap')) return 'NETWORK_SCAN';
  if (sig.includes('brute') || sig.includes('ssh') && sig.includes('scan')) return 'BRUTE_FORCE';
  if (sig.includes('malware') || sig.includes('trojan') || sig.includes('c2') || sig.includes('beacon') || sig.includes('cobalt')) return 'MALWARE';
  if (sig.includes('sql') || sig.includes('injection') || sig.includes('xss') || sig.includes('web') || sig.includes('http')) return 'WEB_ATTACK';
  if (sig.includes('login') || sig.includes('auth') || sig.includes('anomaly')) return 'SUSPICIOUS_LOGIN';
  if (sig.includes('exploit') || sig.includes('cve') || sig.includes('vuln')) return 'VULNERABILITY';
  if (sig.includes('exfil') || sig.includes('outbound') || sig.includes('large')) return 'DATA_EXFILTRATION';
  return 'ANOMALY';
}

function calculateRisk(severity, signature, destIp, assetCriticality = 0) {
  let base = 40;
  if (severity === 'CRITICAL') base = 85 + Math.floor(Math.random()*15);
  else if (severity === 'HIGH') base = 65 + Math.floor(Math.random()*20);
  else if (severity === 'MEDIUM') base = 40 + Math.floor(Math.random()*20);
  else base = 15 + Math.floor(Math.random()*20);

  const sig = signature.toLowerCase();
  if (sig.includes('rce') || sig.includes('remote code')) base += 10;
  if (sig.includes('sql injection')) base += 8;
  if (sig.includes('cve-2024') || sig.includes('cve-2023')) base += 7;
  if (assetCriticality) base += assetCriticality;

  return Math.min(100, base);
}

function extractIndicators(eve) {
  const indicators = [];
  if (eve.alert?.signature) indicators.push(eve.alert.signature);
  if (eve.src_ip) indicators.push(`Source: ${eve.src_ip}`);
  if (eve.dest_ip) indicators.push(`Target: ${eve.dest_ip}`);
  if (eve.proto) indicators.push(`Protocol: ${eve.proto}`);
  if (eve.alert?.category) indicators.push(eve.alert.category);
  if (eve.http?.url) indicators.push(`URL: ${eve.http.url}`);
  if (eve.http?.http_method) indicators.push(`Method: ${eve.http.http_method}`);
  return indicators.slice(0,6);
}

export function parseEveToAlert(eve, assetMap = {}) {
  if (!eve || eve.event_type !== 'alert') return null;

  const severity = mapSeverity(eve.alert?.severity || 3);
  const type = mapType(eve.alert?.signature || '', eve.alert?.category || '');
  
  // Check if destination is critical asset
  const destIp = eve.dest_ip;
  const asset = assetMap[destIp];
  const assetCriticality = asset?.tags?.includes('critical') || asset?.name?.includes('ADMIN') ? 10 : asset?.status === 'CRITICAL' ? 8 : 0;
  const assetId = asset?.id;

  const risk = calculateRisk(severity, eve.alert?.signature || '', destIp, assetCriticality);

  const id = `ALR-${Date.now().toString().slice(-5)}${Math.floor(Math.random()*100).toString().padStart(2,'0')}`;

  const alert = {
    id,
    title: eve.alert?.signature ? eve.alert.signature.replace(/^ET\s+/, '').replace(/-/g, ' ') : `${type.replace('_',' ')} Detected`,
    type,
    severity,
    riskScore: risk,
    sourceIp: eve.src_ip || '0.0.0.0',
    destinationIp: eve.dest_ip || '0.0.0.0',
    sourcePort: eve.src_port,
    destinationPort: eve.dest_port,
    protocol: eve.proto || eve.app_proto || 'TCP',
    sensor: 'Suricata',
    description: eve.alert?.category || `Suricata detected ${type.toLowerCase().replace('_',' ')} from ${eve.src_ip} to ${eve.dest_ip}`,
    signature: eve.alert?.signature || 'Unknown',
    timestamp: eve.timestamp ? new Date(eve.timestamp) : new Date(),
    status: 'NEW',
    assetId,
    isSimulation: false, // REAL!
    evidence: {
      description: `Suricata flagged ${eve.alert?.signature} with severity ${eve.alert?.severity}. Source ${eve.src_ip}:${eve.src_port} → ${eve.dest_ip}:${eve.dest_port}`,
      indicators: extractIndicators(eve),
      rawLogSnippet: JSON.stringify(eve).slice(0,500)
    },
    recommendation: [
      'Verify whether this activity was authorized',
      'Review Suricata logs and related events from same source',
      'Check destination asset for signs of compromise',
      'Consider blocking source IP if malicious',
      'Continue monitoring for follow-up activity'
    ],
    eveRaw: eve
  };

  return alert;
}

// For HTTP events that are suspicious but not alert
export function parseHttpToEvent(eve) {
  if (eve.event_type !== 'http') return null;
  if (!eve.http?.url) return null;
  const url = eve.http.url.toLowerCase();
  const suspicious = url.includes('union') || url.includes('select') || url.includes('<script>') || url.includes('../') || url.includes('etc/passwd');
  if (!suspicious) return null;

  return {
    id: `EVT-${Date.now()}`,
    timestamp: new Date(eve.timestamp),
    type: 'WEB_ATTACK',
    severity: 'MEDIUM',
    source: eve.src_ip,
    destination: eve.dest_ip,
    description: `Suspicious HTTP request to ${eve.http.url}`,
    risk: 55,
    isSimulation: false
  };
}
