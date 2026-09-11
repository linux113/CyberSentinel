// Simulates Suricata writing to eve.json for testing without Suricata installed
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const evePath = process.env.EVE_JSON_PATH || path.join(__dirname, '../../suricata/eve.json');

const templates = [
  { sig: 'ET SCAN NMAP -sS', sev: 2, cat: 'Attempted Information Leak', src: '192.168.56.50', dst: '192.168.56.10', dport: 80 },
  { sig: 'ET SCAN Potential SSH Scan', sev: 2, cat: 'Attempted Information Leak', src: '203.0.113.45', dst: '192.168.56.15', dport: 22 },
  { sig: 'ET WEB_SERVER SQL Injection Attempt', sev: 1, cat: 'Web Application Attack', src: '198.51.100.23', dst: '192.168.56.10', dport: 80 },
  { sig: 'ET MALWARE CobaltStrike Beacon', sev: 1, cat: 'Trojan Activity', src: '192.168.56.88', dst: '8.8.8.8', dport: 443 },
];

function randomEve() {
  const t = templates[Math.floor(Math.random()*templates.length)];
  return {
    timestamp: new Date().toISOString(),
    event_type: 'alert',
    src_ip: t.src,
    src_port: 40000 + Math.floor(Math.random()*20000),
    dest_ip: t.dst,
    dest_port: t.dport,
    proto: 'TCP',
    alert: {
      signature: t.sig,
      severity: t.sev,
      category: t.cat
    }
  };
}

console.log(`[EVE Simulator] Writing to ${evePath} every 5s. This simulates Suricata real detection (no SIM badge).`);
console.log(`[EVE Simulator] Backend should be watching this file. Start backend with EVE_MODE=mock`);

if (!fs.existsSync(path.dirname(evePath))) fs.mkdirSync(path.dirname(evePath), { recursive: true });
if (!fs.existsSync(evePath)) fs.writeFileSync(evePath, '');

setInterval(() => {
  const eve = randomEve();
  fs.appendFileSync(evePath, JSON.stringify(eve) + '\n');
  console.log(`[EVE Simulator] Wrote REAL alert: ${eve.alert.signature} ${eve.src_ip} → ${eve.dest_ip}`);
}, 5000);

// Write one immediately
const eve = randomEve();
fs.appendFileSync(evePath, JSON.stringify(eve) + '\n');
console.log(`[EVE Simulator] Initial REAL alert: ${eve.alert.signature}`);
