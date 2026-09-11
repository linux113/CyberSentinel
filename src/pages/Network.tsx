import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from 'react';
import { getAssets, getSecurityEvents } from '../services/api';
import { Asset, SecurityEvent } from '../lib/types';

export function NetworkPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(()=>{
    getAssets().then(setAssets);
    getSecurityEvents(20).then(setEvents);
  },[]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Network Monitoring</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Visual infrastructure Connections Traffic Suspicious activity</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader><CardTitle>Network Topology</CardTitle></CardHeader>
            <CardContent>
              <div className="relative h-[480px] bg-[#0a121c] rounded-xl border border-white/[0.04] p-6 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-between py-8">
                  {[
                    { label: 'Internet', color: 'bg-sky-500' },
                    { label: 'Firewall WAF', color: 'bg-emerald-500', sub: '192.168.1.1' },
                    { label: 'Router VPN GW', color: 'bg-amber-500', sub: 'Internal Network 192.168.0.0/16' },
                    { label: 'Servers (6)', color: assets.filter(a=>a.status==='CRITICAL').length>0?'bg-red-500':'bg-emerald-500', sub: assets.filter(a=>a.type==='SERVER').map(a=>a.name).slice(0,3).join(', ') },
                    { label: 'Databases (2)', color: 'bg-orange-500', sub: 'DB-01, REDIS-01' },
                    { label: 'Endpoints (12)', color: 'bg-yellow-500', sub: 'HR-PC-07, EMP-PC-042, etc.' },
                  ].map((node,i)=>(
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${node.color} shadow-[0_0_12px_currentColor]`} />
                      <div className="px-4 py-2 rounded-xl bg-[#0f1c2a] border border-white/10 text-center min-w-[200px]">
                        <div className="text-[13px] font-semibold">{node.label}</div>
                        {node.sub && <div className="text-[11px] text-sentinel-muted font-mono mt-1">{node.sub}</div>}
                      </div>
                      {i<5 && <div className="w-px h-6 bg-white/10" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader><CardTitle>Connections</CardTitle></CardHeader>
            <CardContent className="space-y-2 max-h-[300px] overflow-y-auto">
              {events.slice(0,10).map(ev=>(
                <div key={ev.id} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono">
                  <div className="flex justify-between"><span className="text-sentinel-muted">{ev.source}</span><span>→</span><span className="text-sentinel-text">{ev.destination}</span></div>
                  <div className="text-[11px] text-sentinel-dim mt-1">{ev.type} Risk {ev.risk}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Traffic Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-[13px]">
              <div className="flex justify-between"><span className="text-sentinel-muted">Total Events (24h)</span><span className="font-mono font-bold">24,521</span></div>
              <div className="flex justify-between"><span className="text-sentinel-muted">Blocked by Firewall</span><span className="font-mono">1,204</span></div>
              <div className="flex justify-between"><span className="text-sentinel-muted">WAF Blocks</span><span className="font-mono">342</span></div>
              <div className="flex justify-between"><span className="text-sentinel-muted">Suspicious</span><span className="font-mono text-orange-400">87</span></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Asset Communication Map</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="text-[11px] uppercase tracking-wide text-sentinel-muted border-b border-white/[0.06] bg-white/[0.02]">
              <tr><th className="text-left px-4 py-2">Asset</th><th className="text-left px-3 py-2">IP</th><th className="text-left px-3 py-2">Open Ports</th><th className="text-left px-3 py-2">Status</th><th className="text-left px-3 py-2">Risk</th></tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {assets.map(a=>(
                <tr key={a.id} className="hover:bg-white/[0.02]"><td className="px-4 py-2 font-medium">{a.name}</td><td className="px-3 py-2 font-mono">{a.ip}</td><td className="px-3 py-2 font-mono">{a.openPorts.join(', ')}</td><td className="px-3 py-2">{a.status}</td><td className="px-3 py-2 font-mono font-bold">{a.riskScore}</td></tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
