import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, riskToVariant } from '../ui/Badge';
import { getSecurityEvents } from '../../services/api';
import { SecurityEvent } from '../../lib/types';
import { subscribeRealTime } from '../../services/api';

export function LiveFeed() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(()=>{
    getSecurityEvents(12).then(setEvents);
    const unsub = subscribeRealTime((type, data)=>{
      if (type==='new-event' || type==='new-alert') {
        const evt: SecurityEvent = type==='new-event' ? data : {
          id: data.id,
          timestamp: data.timestamp,
          type: data.type,
          severity: data.severity,
          source: data.sourceIp,
          destination: data.destinationIp,
          description: data.title,
          risk: data.riskScore,
          isSimulation: data.isSimulation
        };
        setEvents(prev=>[evt, ...prev].slice(0,12));
      }
    });
    return unsub;
  },[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
          Live Threat Activity
          <span className="ml-auto text-[10px] font-mono text-sentinel-dim">REAL-TIME</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/[0.04] max-h-[420px] overflow-y-auto">
          {events.map(ev=>(
            <div key={ev.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-sentinel-dim">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                    {ev.isSimulation && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide font-bold">Sim</span>}
                    <Badge variant={riskToVariant(ev.risk)}>{ev.severity}</Badge>
                  </div>
                  <div className="text-[13px] font-medium mt-1 truncate group-hover:text-white transition-colors">{ev.description}</div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono">
                    <span className="text-sentinel-muted">SRC: <span className="text-sentinel-text">{ev.source}</span></span>
                    <span className="text-sentinel-muted">→ DST: <span className="text-sentinel-text">{ev.destination}</span></span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11px] text-sentinel-dim">Risk</div>
                  <div className={`text-[14px] font-bold font-mono ${ev.risk>=85?'text-red-400':ev.risk>=60?'text-orange-400':ev.risk>=30?'text-yellow-400':'text-blue-400'}`}>{ev.risk}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
