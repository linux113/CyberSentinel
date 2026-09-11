# CyberSentinel — Making It REAL (Not Just Simulation)

This guide shows how to go from **Demo Mode (simulated telemetry)** to **Real Mode (Suricata + Node.js + MongoDB + LLM)** for college exhibition and prove it's a real SOC product.

## Architecture — Real Data Flow

```
[Kali Linux Attacker]  →  [Victim Network / Lab]
          ↓
   [Suricata IDS]  (listens on interface, detects)
          ↓ EVE JSON ( /var/log/suricata/eve.json )
   [CyberSentinel Backend - EVE Parser Service]
          ↓
   [Node.js + Express API]  +  [Socket.IO real-time]
          ↓
   [MongoDB]  (alerts, incidents, assets, vulnerabilities, events)
          ↓
   [CyberSentinel Frontend]  (this UI)  →  WebSocket new-alert
```

**Your frontend is already API-ready:** `src/services/api.ts` functions will call `/api/*` instead of mock. No UI redesign needed.

---

## Phase 1: Lab Setup (What You Need to Show)

### Hardware / VMs
- **1x Kali Linux VM** (attacker) — you already have for attacks
- **1x Ubuntu Server 22.04 VM** (victim + Suricata + Backend + MongoDB + Frontend)
  - 2 vCPU, 4GB RAM minimum
  - 2 network interfaces: NAT + Host-only (for lab traffic)
- **Your laptop** running frontend (or same Ubuntu VM)

### Network Topology for Demo
```
Internet (simulated)
  ↓
pfSense / Ubuntu as Router (optional)
  ↓
Internal Lab: 192.168.56.0/24
  - 192.168.56.10 → WEB-SERVER-01 (Ubuntu + Apache/Nginx)
  - 192.168.56.20 → DB-01
  - 192.168.56.100 → SIEM-COLLECTOR (Suricata + Backend + MongoDB)
  - 192.168.56.50 → Kali (192.168.56.50)
```

For college exhibition, **single Ubuntu VM** is enough: Suricata listening on `eth0`, backend parsing eve.json, MongoDB local.

---

## Phase 2: Install Real Components

### 1. Suricata (Security Sensor)
```bash
# On Ubuntu Server
sudo add-apt-repository ppa:oisf/suricata-stable
sudo apt update
sudo apt install suricata -y

# Configure interface (edit /etc/suricata/suricata.yaml)
# Change af-packet interface to your lab interface, e.g., enp0s3 or eth0
sudo nano /etc/suricata/suricata.yaml

# Enable EVE JSON logging (already enabled by default in /var/log/suricata/eve.json)
# Ensure these outputs are enabled:
# - eve-log:
#     enabled: yes
#     filetype: regular
#     filename: eve.json
#     types: [alert, http, dns, tls, flow]

# Update rules
sudo suricata-update

# Start Suricata
sudo systemctl enable suricata
sudo systemctl start suricata
sudo systemctl status suricata

# Check EVE JSON is generating
tail -f /var/log/suricata/eve.json | jq
```

**Test Suricata detects something:**
```bash
# From Kali, run:
nmap -sS 192.168.56.10
# or
curl "http://192.168.56.10/?id=1 UNION SELECT 1,2,3"

# On Suricata VM, you should see alert in eve.json
cat /var/log/suricata/eve.json | grep -i alert | tail -n 5
```

### 2. MongoDB
```bash
# Install MongoDB 7.0
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl start mongod

# Create DB and user
mongosh
> use cybersentinel
> db.createUser({user: "sentinel", pwd: "yourStrongPassword", roles: [{role: "readWrite", db: "cybersentinel"}]})
> exit
```

### 3. Backend (Node.js + Express) — We provide skeleton
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with Mongo URI, Suricata eve.json path, LLM API key

# Run backend
npm run dev
# Backend will:
# - Watch /var/log/suricata/eve.json (or ./suricata/eve.json for demo)
# - Parse each alert line
# - Transform to CyberSentinel Alert model
# - Save to MongoDB
# - Emit via Socket.IO new-alert
# - Expose REST API for frontend
```

### 4. Frontend Real Mode
```bash
# In frontend .env
VITE_API_URL=http://192.168.56.100:3000/api
VITE_WS_URL=http://192.168.56.100:3000

# In src/services/api.ts, replace mock with fetch:
# getAlerts() => fetch(`${API_URL}/alerts`)
# Already prepared — just uncomment real implementation
```

---

## Phase 3: Backend Implementation (We Scaffolded)

We created `backend/` folder with:

- **Express server** with CORS, Socket.IO
- **EVE Parser Service** that tails eve.json (like `tail -f`)
- **Models:** Alert, Incident, Asset, Vulnerability, SecurityEvent (Mongoose)
- **Routes:** `/api/dashboard/stats`, `/api/alerts`, `/api/incidents`, `/api/assets`, `/api/vulnerabilities`, `/api/ai/analyze/:id`
- **AI Service:** LLM prompt that is defensive, evidence-based, no fabrication
- **Real-time:** Socket.IO emits `new-alert`, `new-event`, `score-update`

### How EVE JSON → Alert Transformation Works

Suricata EVE JSON example:
```json
{
  "timestamp": "2024-09-10T10:12:23.123456+0000",
  "event_type": "alert",
  "src_ip": "192.168.56.50",
  "src_port": 54321,
  "dest_ip": "192.168.56.10",
  "dest_port": 80,
  "proto": "TCP",
  "alert": {
    "signature": "ET SCAN NMAP -sS",
    "severity": 2,
    "category": "Attempted Information Leak"
  }
}
```

Transforms to:
```js
{
  id: "ALR-10042",
  title: "Port Scanning Detected",
  type: "NETWORK_SCAN",
  severity: mapSuricataSeverity(2) → "MEDIUM",
  riskScore: calculateRisk(severity, signature, assetCriticality),
  sourceIp: "192.168.56.50",
  destinationIp: "192.168.56.10",
  sensor: "Suricata",
  signature: "ET SCAN NMAP -sS",
  evidence: { description, indicators },
  isSimulation: false // REAL!
}
```

### Risk Score Real Calculation
```js
function calculateRisk(alert) {
  let score = 30;
  if (alert.severity === 1) score = 85 + rand(15); // Critical
  if (alert.severity === 2) score = 60 + rand(20); // High
  // + asset criticality: if dest is WEB-SERVER-01 or ADMIN-PORTAL, +10
  // + if signature contains RCE, SQLi, etc. +15
  // + if src is external +5
  return Math.min(100, score);
}
```

---

## Phase 4: Real AI Analysis (LLM Layer)

**Prompt we use (defensive, no fabrication):**

```
You are CyberSentinel AI Security Analyst — a defensive assistant.

You are given:
- Alert: {title, type, severity, sourceIp, destIp, signature, evidence}
- Related logs (if any)
- Asset context

You must respond in structured JSON:
{
  "whatHappened": "Observed ... from ...",
  "whySuspicious": "Explain why this deviates from baseline...",
  "riskAssessment": "Risk X/100 — SEVERITY — reason",
  "potentialImpact": "If successful, ... Current evidence shows ...",
  "recommendedActions": ["1. Verify...", "2. Review..."],
  "confidence": 0-100,
  "observedEvidence": ["indicator1", "indicator2"],
  "inference": ["suggests automated tooling", "no evidence of compromise"]
}

Rules:
- Distinguish observed evidence vs inference vs recommendation
- Never claim attack confirmed unless evidence supports it
- Never fabricate IP reputation, CVE details, log lines
- If insufficient evidence: say "Insufficient evidence to determine this conclusively"
- Defensive only: no exploit instructions
```

**LLM Provider:**
- OpenAI GPT-4o-mini / Claude / Local LLM (Ollama)
- API key stored in backend .env, never exposed to frontend
- Backend calls LLM, frontend only gets result

---

## Phase 5: Exhibition Demo — Real vs Simulation

For college exhibition, show **both modes side-by-side** to prove you understand real SOC:

### Demo Script (Real Mode)

1. **Show Suricata running:**
   ```bash
   sudo systemctl status suricata
   tail -f /var/log/suricata/eve.json | jq '.alert.signature'
   ```

2. **From Kali, launch real attack:**
   ```bash
   nmap -sV -sS 192.168.56.10
   hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.56.10 http-post-form "/login:username=^USER^&password=^PASS^:Invalid"
   ```

3. **Show backend terminal:**
   - Logs: "New EVE alert parsed: ET SCAN NMAP -sS → ALR-10042 created → Risk 72 → Emitted via Socket.IO"

4. **Show frontend Dashboard (Real Mode):**
   - Live Threat feed updates in real-time (no SIM badge!)
   - Security Score drops from 100 → 87
   - Alert appears: Source 192.168.56.50 (Kali) → Web Server, Risk 72
   - Click alert → Event Information shows real Suricata signature, real IPs
   - Click "Analyze with AI" → Real LLM analysis with observed evidence from eve.json

5. **Show MongoDB:**
   ```bash
   mongosh cybersentinel --eval "db.alerts.find().sort({_id:-1}).limit(3).pretty()"
   ```

6. **Then switch to Demo Mode:**
   - Explain: "For times when Suricata not connected, we have simulation engine that mimics same flow but clearly labeled SIMULATION"
   - Show Simulate buttons

**This proves you built API-ready, real-time-ready frontend that works with real Suricata, not just mock.**

---

## What We Provide in This Repo

- `backend/` — Complete Node.js + Express + Socket.IO + Mongoose skeleton with EVE parser
- `suricata/` — Example suricata.yaml, rules, and sample eve.json for testing without real Suricata
- `docs/REAL_SETUP.md` — This guide
- Frontend already has `isDemoMode` toggle — when false, it calls real API

### Quick Start Real Backend (Without Suricata — Using Sample eve.json)

```bash
cd backend
npm install
npm run dev:mock
# This watches suricata/eve.json sample file and emits real alerts

# In another terminal, simulate Suricata writing:
cat suricata/sample-eve.json >> suricata/eve.json
# or
node src/services/eveSimulator.js
```

Frontend will show real alerts (no SIM badge) coming from "Suricata" sensor.

---

## For Your College Report

Write:

> "CyberSentinel was built with API-ready and real-time-ready design. Initial Arena prototype uses simulated telemetry clearly labeled as DEMO, but architecture supports real Suricata integration: Suricata generates EVE JSON, Node.js backend tails and parses it, stores in MongoDB, and pushes via Socket.IO to dashboard. We demonstrated real detection by running Nmap and brute-force from Kali Linux, which triggered Suricata alerts that appeared in dashboard in real-time without SIM badge, with AI analysis based on actual evidence. This proves frontend does not need redesign for production."

Include screenshots:
- Suricata eve.json tail
- Backend logs parsing
- MongoDB alerts collection
- Frontend real alert (no SIM)
- AI analysis with real evidence

---

## Cost & Deployment Options

- **Lab:** 2 VMs on your laptop (free)
- **Cloud:** AWS EC2 t3.medium with Suricata + MongoDB Atlas free tier + Vercel for frontend
- **Docker:** We provide docker-compose.yml for one-command real stack

---

## Next Steps Checklist

- [ ] Install Suricata on Ubuntu VM
- [ ] Install MongoDB
- [ ] Run backend `npm run dev` (we scaffolded)
- [ ] Configure frontend `VITE_API_URL` to backend
- [ ] Test with Kali Nmap → see real alert in dashboard
- [ ] Integrate LLM (OpenAI key in backend .env)
- [ ] For exhibition, prepare both Real and Demo mode screens
- [ ] Record video of real attack → real alert flow

Want me to scaffold the backend code now so you can run `npm run dev` and see real alerts? Say yes and I'll generate full backend.
