# CyberSentinel — AI-Powered Cybersecurity Command Center

**Product Type:** Cybersecurity SaaS / Security Operations Dashboard  
**Design Direction:** Premium enterprise SOC command center  
**Initial Build Platform:** Arena AI (Vite + React + TypeScript + Tailwind)  
**Future Stack:** Node.js + Express + MongoDB + Suricata + LLM

> "An AI-powered cybersecurity command center that transforms security telemetry into prioritized, understandable and actionable security intelligence."

## Distinctive Workflow (Exhibition Ready)

```
Live Threat → Alert → Evidence → Risk Score → AI Analysis → Incident → Recommended Response → Resolution → Report
```

This workflow makes the demo feel like a real security product, not just a UI prototype.

## Quick Start

```bash
npm install
npm run dev   # http://localhost:5173
```

- Landing: `/`
- Login: `/login` (Enter Demo — no auth required)
- Dashboard: `/dashboard`

## Features Implemented

### Phase 1 — Foundation & Design System
- Dark SOC theme: deep navy/black panels, glassmorphism, subtle glow
- Inter + JetBrains Mono typography
- Left sidebar + top nav (environment selector, search, notifications, status)
- Landing page with Problem/Solution/Features/Workflow
- Login with Demo Mode

### Phase 2 — Core SOC Workflow
- **Dashboard / Overview:** Security Posture radial (82/100 GOOD), threat summary (Critical/High/Medium/Low clickable), active incidents, live threat feed (real-time), threat activity graph (24h/7d/30d), threat categories donut, asset table, health map
- **Live Threats:** LIVE badge, stats (active/critical/new/investigating/resolved), threat stream table, live event feed
- **Alerts:** Alert Center with ID, timestamp, type, source/dest, severity, risk, sensor, status, filters, search
- **Alert Detail:** Overview, event info (IP/port/protocol/sensor/signature), Why Was This Detected (indicators), AI Threat Analysis (What Happened, Why Suspicious, Risk Assessment, Impact, Recommended Actions, Confidence, Observed Evidence vs Inference)
- **Demo Simulation:** Simulate Port Scan, Brute Force, Suspicious Login, Critical Vuln, Malware — creates alert, updates risk score, appears in live feed

### Phase 3 — Extended Modules
- **Incidents:** NEW→INVESTIGATING→CONTAINED→RESOLVED→CLOSED, status update, timeline, related alerts/assets, notes, AI analysis
- **Threat Intelligence:** IP/domain/hash/URL lookup, reputation, risk, first/last seen, sources, related activity, tags, AI safety notice (never claims malicious without evidence, states "Insufficient evidence..." when needed)
- **Vulnerabilities:** Critical/High/Medium/Low counts, table with Vuln/Asset/Severity/CVSS/Status/Detected, remediation
- **Assets:** Inventory 20+ assets (servers, endpoints, DB, network, app, cloud), type/status filters, risk scoring, detail page with open ports, vulns, alerts
- **Network Monitoring:** Topology visualization Internet→Firewall→WAF→Router→Servers→DB→Endpoints, connections, traffic summary, asset comms map
- **AI Security Analyst:** Defensive assistant workspace, structured response format (Assessment/Evidence/Risk/Actions/Confidence), example questions, distinguishes evidence vs inference
- **Reports:** Daily, Incident, Vulnerability, Threat Intel, Asset reports, sample report preview
- **Timeline:** Chronological events + incident actions
- **Settings:** Environment selector, demo mode toggle, reset simulation, future integration diagram

### Simulation Engine
- 20+ assets, 54 alerts, 15 incidents, 31 vulnerabilities, 120 security events
- `services/simulation.ts`: `simulateThreat(type)`, `simulateEvent()`, auto-simulation loop
- Clearly labeled SIMULATION / DEMO EVENT badges
- Security score dynamic: `100 - (critical*8 + high*4 + medium*2 + low*0.5 + critical vulns*5)`

### API-Ready & Real-Time Ready
```ts
// services/api.ts — mock now, real endpoints later
getDashboardStats() // → /api/dashboard/stats
getAlerts()         // → /api/alerts
getAlert(id)        // → /api/alerts/:id
getIncidents()      // → /api/incidents
getIncident(id)     // → /api/incidents/:id
getAssets()         // → /api/assets
getVulnerabilities()// → /api/vulnerabilities
analyzeAlert(id)    // → /api/ai/analyze/:id
updateIncidentStatus(id, status)

// Real-time
subscribeRealTime(cb) // future WebSocket new-alert
emitRealTime(type, data)
```

Future data flow:
```
Kali / Network
  ↓
Suricata (EVE JSON)
  ↓
CyberSentinel Backend (Node.js + Express)
  ↓
MongoDB
  ↓
Dashboard (this UI) via WebSocket
```

### Security & AI Safety
- Frontend never exposes AI keys, MongoDB creds, never connects directly to DB, never executes commands
- Alert data treated as untrusted
- AI clearly distinguishes observed evidence vs inference vs recommendation
- Does not fabricate IP reputation, CVE, log evidence
- States uncertainty when evidence insufficient

## Color Semantics
- Critical: #ef4444 Red
- High: #f97316 Orange
- Medium: #eab308 Yellow
- Low: #3b82f6 Blue
- Healthy: #22c55e Green
- Info: #0ea5e9 Sky

## Demo for Exhibition

1. Start at Landing → Enter Command Center
2. Dashboard shows Security Score 82, threat counts, live feed
3. Click "Simulate Port Scan" — watch:
   - Event appears in Live Threat Activity
   - Alert generated (ALR-xxxxx) with SIM badge
   - Risk score decreases
   - Threat appears in Live Threats
   - Notification appears
4. Click alert → Alert Detail → "Analyze with AI" → structured analysis
5. "Create Incident" → INC-xxxx created → update status INVESTIGATING→CONTAINED→RESOLVED
6. Check AI Analyst → ask "What should I investigate first?" → prioritized queue
7. Check Assets → see most at risk WEB-SERVER-01
8. Check Reports → generate security report

All simulated events labeled "SIMULATION — Not Real Telemetry" and demo banner shows "DEMO ENVIRONMENT".

## Tech Stack
- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (custom sentinel theme)
- Recharts for threat graphs
- Lucide React icons
- React Router 6

## Project Structure
```
src/
  components/
    layout/ Sidebar, TopNav, Layout
    ui/ Card, Badge
    dashboard/ SecurityPosture, ThreatSummary, LiveFeed, ThreatGraph, CategoryDonut, AssetTable, HealthMap, ActiveIncidents
  pages/ Landing, Login, Dashboard, LiveThreats, Alerts, AlertDetail, Incidents, IncidentDetail, ThreatIntel, Vulnerabilities, Assets, AssetDetail, Network, AIAnalyst, Reports, Timeline, Settings
  services/ api.ts (mock + API-ready), simulation.ts
  lib/ types.ts, mockData.ts
  store/ AppContext.tsx
```

## Next Steps (Future Backend)
- Node.js + Express API with routes matching service layer
- MongoDB models for Alert, Incident, Asset, Vulnerability
- Suricata EVE JSON parser → create alerts
- WebSocket for real-time new-alert events
- LLM integration for analyzeAlert with evidence-based prompting
- Authentication & RBAC

## License
Demo prototype for college exhibition — not production security software.
