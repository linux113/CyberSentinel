import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useApp } from '../store/AppContext';
import { resetSimulation } from '../services/api';

export function SettingsPage() {
  const { isDemoMode, setDemoMode, environment, setEnvironment } = useApp();

  return (
    <div className="space-y-6 max-w-[800px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Settings</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Platform configuration • Future backend integration ready</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Environment</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-sentinel-muted uppercase tracking-wide">Current Environment</label>
            <select value={environment} onChange={e=>setEnvironment(e.target.value)} className="mt-2 w-full h-10 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
              <option>Lab</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <div>
              <div className="font-medium text-[13px]">Demo Mode</div>
              <div className="text-[11px] text-sentinel-muted">Simulated telemetry, clearly labeled as SIMULATION</div>
            </div>
            <button onClick={()=>setDemoMode(!isDemoMode)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border ${isDemoMode?'bg-amber-500/20 text-amber-300 border-amber-500/30':'bg-white/5 text-sentinel-muted border-white/10'}`}>
              {isDemoMode?'ON':'OFF'}
            </button>
          </div>
          <button onClick={()=>{ resetSimulation(); window.location.reload(); }} className="px-4 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px] hover:bg-white/[0.1]">Reset Simulation Data</button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Future Integration</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-[13px]">
          <div className="p-3 rounded-lg bg-[#0a121c] border border-white/[0.06] font-mono text-[11px]">
            <div>Kali / Network</div>
            <div>↓</div>
            <div>Suricata</div>
            <div>↓</div>
            <div>EVE JSON</div>
            <div>↓</div>
            <div>CyberSentinel Backend (Node.js + Express)</div>
            <div>↓</div>
            <div>MongoDB</div>
            <div>↓</div>
            <div>Dashboard (this UI)</div>
          </div>
          <div className="text-[11px] text-sentinel-muted">Frontend is API-ready: services/api.ts will call /api/dashboard/stats, /api/alerts, /api/incidents, /api/assets, /api/vulnerabilities, /api/ai/analyze/:id</div>
          <div className="text-[11px] text-sentinel-muted">Real-time ready: WebSocket/Socket.IO event new-alert will update feed, counts, graph, score, notifications, asset status.</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Security Requirements</CardTitle></CardHeader>
        <CardContent className="text-[12px] leading-relaxed text-sentinel-muted space-y-2">
          <p>Frontend must never:</p>
          <ul className="list-disc pl-5">
            <li>Expose AI API keys</li>
            <li>Expose MongoDB credentials</li>
            <li>Connect directly to MongoDB</li>
            <li>Execute security commands from browser</li>
          </ul>
          <p>Backend will handle auth, authorization, validation, rate limiting, logging, secrets.</p>
        </CardContent>
      </Card>
    </div>
  );
}
