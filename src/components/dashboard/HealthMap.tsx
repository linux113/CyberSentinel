import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Shield, Globe, Server, Database, Laptop } from 'lucide-react';

export function HealthMap() {
  const nodes = [
    { id: 'internet', label: 'Internet', icon: Globe, status: 'HEALTHY', x: 50, y: 5 },
    { id: 'firewall', label: 'Firewall', icon: Shield, status: 'HEALTHY', x: 50, y: 25 },
    { id: 'waf', label: 'WAF', icon: Shield, status: 'HEALTHY', x: 20, y: 45 },
    { id: 'network', label: 'Network', icon: Server, status: 'WARNING', x: 50, y: 45 },
    { id: 'vpn', label: 'VPN GW', icon: Shield, status: 'WARNING', x: 80, y: 45 },
    { id: 'web', label: 'Web Server', icon: Server, status: 'CRITICAL', x: 25, y: 70 },
    { id: 'admin', label: 'Admin Portal', icon: Server, status: 'CRITICAL', x: 50, y: 70 },
    { id: 'db', label: 'DB-01', icon: Database, status: 'WARNING', x: 75, y: 70 },
    { id: 'endpoints', label: 'Endpoints (12)', icon: Laptop, status: 'WARNING', x: 50, y: 90 },
  ];

  const statusColor = (s: string) => s==='HEALTHY'?'bg-emerald-500 border-emerald-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]': s==='WARNING'?'bg-amber-500 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]':'bg-red-500 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Health Map</CardTitle>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Healthy</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />Warning</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Critical</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-[320px] bg-[#0a121c] rounded-lg border border-white/[0.04] overflow-hidden p-4">
          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="50%" y1="12%" x2="50%" y2="22%" stroke="#1c2e42" strokeWidth="1.5" />
            <line x1="50%" y1="32%" x2="20%" y2="42%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="50%" y1="32%" x2="50%" y2="42%" stroke="#1c2e42" strokeWidth="1.5" />
            <line x1="50%" y1="32%" x2="80%" y2="42%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="20%" y1="52%" x2="25%" y2="66%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="50%" y1="52%" x2="50%" y2="66%" stroke="#1c2e42" strokeWidth="1.5" />
            <line x1="80%" y1="52%" x2="75%" y2="66%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="25%" y1="78%" x2="50%" y2="86%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="50%" y1="78%" x2="50%" y2="86%" stroke="#1c2e42" strokeWidth="1" />
            <line x1="75%" y1="78%" x2="50%" y2="86%" stroke="#1c2e42" strokeWidth="1" />
          </svg>
          {nodes.map(n=>(
            <div key={n.id} className="absolute flex flex-col items-center gap-1.5" style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center bg-[#0f1c2a] ${n.status==='CRITICAL'?'animate-pulse-subtle':''}`}>
                <n.icon className="w-5 h-5 text-sentinel-text" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a121c] ${statusColor(n.status)}`} />
              </div>
              <div className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/40 border border-white/10 whitespace-nowrap">{n.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
