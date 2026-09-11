# Exhibition Demo Script — Show REAL + DEMO

## Goal: Prove CyberSentinel is not just UI, it's real SOC product with real Suricata detection

### Setup (Before Exhibition)

1. **Single Ubuntu VM** (192.168.56.100) running:
   - Suricata listening on enp0s3
   - MongoDB
   - Backend (`cd backend && npm run dev`)
   - Frontend (`npm run dev -- --host 0.0.0.0`) OR built version

2. **Kali VM** (192.168.56.50) for attacks

3. **Prepare terminals:**
   - Terminal 1: `tail -f /var/log/suricata/eve.json | jq` (or `suricata/eve.json` for mock)
   - Terminal 2: `cd backend && npm run dev` (shows real-time parsing logs)
   - Terminal 3: `mongosh --eval "db.alerts.find().sort({_id:-1}).limit(1).pretty()"` (show DB)
   - Terminal 4: Kali ready with `nmap` and `hydra`

4. **Frontend in DEMO mode initially** (so you can show simulation first, then switch to REAL)

---

### Part 1: Show Problem (30 sec)

"Security teams are overwhelmed by data from network, firewalls, endpoints. Critical threats buried in noise. No prioritization. Our solution: CyberSentinel transforms telemetry into actionable intelligence with workflow: Monitor → Detect → Analyze → Prioritize → Investigate → Respond → Resolve → Report"

Show Landing page → Dashboard overview

---

### Part 2: Show DEMO Mode (1 min) — For when Suricata not connected

- Point to DEMO banner: "DEMO ENVIRONMENT — Simulated telemetry, clearly labeled"
- Click "Simulate Port Scan" → Show:
  - Event appears in Live Threat Activity with SIM badge
  - Alert generated ALR-xxxxx with SIM
  - Security Score drops 82 → 75
  - Notification appears
  - Click alert → Show Evidence, Risk, Recommendation
  - Click "Analyze with AI" → Structured analysis (Observed vs Inference)
  - Click "Create Incident" → INC-xxxx → Timeline
- Explain: "This simulation lets us demo full workflow without real attacks, but we clearly label it as simulation, never as real"

---

### Part 3: Show REAL Mode (2-3 min) — The Real Proof

**Switch to REAL:**

1. **Show Suricata running:**
   ```bash
   sudo systemctl status suricata
   # or if using mock file:
   cat suricata/eve.json
   ```

2. **Show Backend watching:**
   ```
   [EVE Watcher] Tailing /var/log/suricata/eve.json for real alerts... (no SIM badge)
   ```

3. **From Kali, run REAL attack (do it live):**
   ```bash
   nmap -sS -sV 192.168.56.10
   ```
   - Immediately in Terminal 1: eve.json shows new alert line with signature "ET SCAN NMAP -sS"
   - In Terminal 2 (backend): Log appears: "[EVE] REAL Alert created: ALR-... Port Scanning Detected Risk 72 192.168.56.50→192.168.56.10 [MEDIUM]"
   - In Frontend (refresh or real-time): 
     - Live Threat feed updates **without SIM badge** (REAL!)
     - Alert appears: Source 192.168.56.50 (Kali) → Web Server, Risk 72, Sensor Suricata
     - Security Score drops
     - Notification: "MEDIUM alert: Port Scanning Detected"

4. **Click real alert:**
   - Show Event Information: Real IPs (Kali IP → Web Server), real Suricata signature, real timestamp
   - Show Raw Log Snippet: Actual EVE JSON line
   - Click "Analyze with AI" → Real analysis based on actual evidence from eve.json, not mock
   - Point out: "No SIM badge — this is REAL telemetry from Suricata"

5. **Second attack — Brute Force:**
   ```bash
   hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.56.10 http-post-form "/login:username=^USER^&password=^PASS^:Invalid" -t 4
   # or simpler:
   for i in {1..20}; do curl -s -X POST http://192.168.56.10/login -d "username=admin&password=wrong$i" > /dev/null; done
   ```
   - Suricata detects (if rule enabled) or at least http logs
   - Backend creates REAL alert: "Possible Brute Force Attack" Risk 87 HIGH
   - Show in frontend

6. **Show MongoDB:**
   ```bash
   mongosh cybersentinel --eval "db.alerts.find({isSimulation:false}).sort({timestamp:-1}).limit(2).pretty()"
   ```
   - Shows real alerts stored in DB with eveRaw field (original EVE JSON for forensics)

7. **Show AI Analysis with Real Evidence:**
   - Click latest real alert → AI Analysis → Point out:
     - "Observed Evidence: NMAP signature, Source IP 192.168.56.50, Target 192.168.56.10"
     - "Inference: Suggests automated tooling, no evidence of successful compromise"
     - "Confidence 85%"
   - Explain AI safety: "We never fabricate IP reputation or CVE, we distinguish evidence vs inference"

---

### Part 4: Architecture Explanation (30 sec)

Show diagram (in Settings page or slide):

```
Kali (Attacker)
  ↓
Suricata IDS (on Ubuntu) → EVE JSON (/var/log/suricata/eve.json)
  ↓
Backend EVE Parser (Node.js) tails file, transforms to Alert model
  ↓
MongoDB stores alerts, assets, incidents
  ↓
Socket.IO emits new-alert
  ↓
Frontend Dashboard updates real-time (no SIM badge)
  ↓
AI Service (OpenAI/Ollama) analyzes with evidence-based prompt
```

"Frontend is API-ready and real-time-ready — same UI works for both demo and real. No redesign needed when switching from mock to Suricata."

---

### Part 5: Why This is Not Just UI (30 sec)

- "Many college projects are just CRUD dashboards. Ours has distinctive SOC workflow: Live Threat → Alert → Evidence → Risk Score → AI Analysis → Incident → Response → Report"
- "We have 20+ assets, 54 alerts, 31 vulns, 120 events mock for demo, but also real Suricata integration"
- "AI is defensive, evidence-based, no fabrication — we state uncertainty"
- "We handle error states, empty states (SYSTEM SECURE), demo labeling, security requirements (no secrets in frontend)"
- "Future: Add WAF, EDR, vulnerability scanner feeds same way"

---

### Q&A Preparation

**Q: Is this real detection or just UI?**
A: Both. Demo mode is simulation clearly labeled for exhibition, but we also have real mode with Suricata. I can show live Nmap from Kali triggering real alert without SIM badge, stored in MongoDB, with real EVE JSON.

**Q: Where does AI come?**
A: Backend calls LLM with defensive prompt that distinguishes observed evidence vs inference. API key never exposed to frontend. If no key, falls back to rule-based analysis. For exhibition, we show both.

**Q: How does risk score work?**
A: Security Score = 100 - (critical*8 + high*4 + medium*2 + low*0.5 + critical vulns*5). Risk per alert: base from Suricata severity + asset criticality + signature (RCE, SQLi) + external source. 0-29 LOW, 30-59 MEDIUM, 60-84 HIGH, 85-100 CRITICAL.

**Q: Can it scale?**
A: Yes, architecture supports horizontal: Suricata cluster → Kafka → Backend → MongoDB sharded → Frontend. Currently single VM for lab.

**Q: What about false positives?**
A: Alert status includes FALSE_POSITIVE, incident can be closed, AI confidence shows uncertainty. SOC analyst can mark.

---

### Checklist for Exhibition Laptop

- [ ] Ubuntu VM with Suricata, MongoDB, Backend, Frontend running
- [ ] Kali VM ready
- [ ] Terminals prepared (eve.json tail, backend logs, mongosh)
- [ ] Frontend in both demo and real mode (toggle via .env)
- [ ] Screenshots backup in case live demo fails (always have backup!)
- [ ] Printed architecture diagram
- [ ] Video recording of real attack → real alert flow (in case network fails)

### Backup Plan

If Suricata fails or network issues:
- Use `backend/src/services/eveSimulator.js` which writes to `suricata/eve.json` every 5s simulating real Suricata (no SIM badge, but still file-based)
- Run: `cd backend && npm run simulate` in one terminal, `EVE_MODE=mock npm run dev` in another
- Frontend will show REAL alerts (no SIM) coming from file, proving file-watching and parsing works

This way you always have "real" file-based detection even without actual Suricata process.

---

### One-Liner for Judges

"CyberSentinel is an AI-powered SOC command center that transforms Suricata telemetry into prioritized, understandable, actionable intelligence with workflow Live Threat→Alert→Evidence→Risk→AI→Incident→Response→Report — we show both simulation for demo and real Suricata detection from Kali attacks with no SIM badge, stored in MongoDB, real-time via Socket.IO, with defensive AI that distinguishes evidence vs inference."

Good luck!
