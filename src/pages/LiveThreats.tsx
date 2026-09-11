import { useEffect, useState } from 'react';
import { getSecurityEvents, getAlerts } from '../services/api';
import { SecurityEvent, Alert } from '../lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant, riskToVariant } from '../components/ui/Badge';
import { Activity, Zap } from 'lucide-react';
import { subscribeRealTime } from '../services/api';
import { simulateThreat } from '../services/simulation';
import { Link } from 'react-router-dom';

export function LiveThreats() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState({ active: 0, critical: 0, newThreats: 0, investigating: 0, resolved: 0 });

  const load = async () => {
    const [ev, al] = await Promise.all([getSecurityEvents(100), getAlerts()]);
    setEvents(ev);
    setAlerts(al);
    setStats({
      active: al.filter(a=>a.status==='NEW'||a.status==='INVESTIGATING').length,
      critical: al.filter(a=>a.severity==='CRITICAL').length,
      newThreats: al.filter(a=>a.status==='NEW').length,
      investigating: al.filter(a=>a.status==='INVESTIGATING').length,
      resolved: al.filter(a=>a.status==='RESOLVED').length,
    });
  };

  useEffect(()=>{
    load();
    const unsub = subscribeRealTime(()=>load());
    return unsub;
  },[]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
            Live Threats
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold tracking-widest">LIVE</span>
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-1">Real-time security events Future: Suricata EVE JSON → Backend → WebSocket</p>
        </div>
        <button onClick={()=>{ simulateThreat(); load(); }} className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[12px] flex items-center gap-2 hover:bg-white/[0.1]">
          <Zap className="w-3 h-3" /> Simulate Threat
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[
          { label: 'Active Threats', value: stats.active, color: 'text-white' },
          { label: 'Critical', value: stats.critical, color: 'text-red-400' },
          { label: 'New', value: stats.newThreats, color: 'text-sky-400' },
          { label: 'Investigating', value: stats.investigating, color: 'text-orange-400' },
          { label: 'Resolved', value: stats.resolved, color: 'text-emerald-400' },
        ].map(s=>(
          <Card key={s.label}><CardContent className="p-4"><div className="text-[11px] uppercase tracking-wide text-sentinel-muted font-semibold">{s.label}</div><div className={`text-[24px] font-bold mt-1 ${s.color}`}>{s.value}</div></CardContent></Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="w-4 h-4" /> Threat Stream</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead className="text-[11px] uppercase tracking-wide text-sentinel-muted border-b border-white/[0.06] bg-white/[0.02]">
                    <tr>
                      <th className="text-left px-4 py-3">Threat</th>
                      <th className="text-left px-3 py-3">Source</th>
                      <th className="text-left px-3 py-3">Destination</th>
                      <th className="text-left px-3 py-3">Type</th>
                      <th className="text-left px-3 py-3">Severity</th>
                      <th className="text-left px-3 py-3">Risk</th>
                      <th className="text-left px-3 py-3">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {alerts.slice(0,20).map(a=>(
                      <tr key={a.id} className="hover:bg-white/[0.03]">
                        <td className="px-4 py-2.5"><Link to={`/alerts/${a.id}`} className="font-medium hover:text-white">{a.title}</Link><div className="text-[11px] font-mono text-sentinel-dim">{a.id}</div></td>
                        <td className="px-3 py-2.5 font-mono text-[11px]">{a.sourceIp}</td>
                        <td className="px-3 py-2.5 font-mono text-[11px]">{a.destinationIp}</td>
                        <td className="px-3 py-2.5"><Badge variant="neutral">{a.type}</Badge></td>
                        <td className="px-3 py-2.5"><Badge variant={severityToVariant(a.severity)}>{a.severity}</Badge></td>
                        <td className="px-3 py-2.5"><Badge variant={riskToVariant(a.riskScore)}>{a.riskScore}</Badge></td>
                        <td className="px-3 py-2.5 text-[11px] font-mono text-sentinel-muted">{new Date(a.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader><CardTitle>Live Event Feed</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/[0.04] max-h-[600px] overflow-y-auto">
                {events.map(ev=>(
                  <div key={ev.id} className="p-3 hover:bg-white/[0.02]">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-sentinel-dim">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                      <Badge variant={severityToVariant(ev.severity)}>{ev.severity}</Badge>
                      {ev.isSimulation && <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">Sim</span>}
                    </div>
                    <div className="text-[12px] font-medium mt-1">{ev.description}</div>
                    <div className="text-[11px] font-mono text-sentinel-muted mt-1">{ev.source} → {ev.destination} Risk {ev.risk}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
