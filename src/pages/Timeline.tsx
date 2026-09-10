import { useEffect, useState } from 'react';
import { getSecurityEvents, getIncidents } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { SecurityEvent, Incident } from '../lib/types';
import { Badge, severityToVariant } from '../components/ui/Badge';

export function TimelinePage() {
  const [events, setEvents] = useState<(SecurityEvent & { typeLabel: string })[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(()=>{
    getSecurityEvents(50).then(ev=>setEvents(ev.map(e=>({...e, typeLabel: 'EVENT'}))));
    getIncidents().then(setIncidents);
  },[]);

  const combined = [
    ...events.map(e=>({ time: e.timestamp, title: e.description, severity: e.severity, id: e.id, source: `${e.source} → ${e.destination}`, type: e.type })),
    ...incidents.flatMap(i=>i.timeline.map(t=>({ time: t.timestamp, title: t.title, severity: i.severity, id: `${i.id}-${t.id}`, source: t.description, type: t.type })))
  ].sort((a,b)=> new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0,80);

  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Activity Timeline</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Chronological security events and incident actions</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Timeline — Last 50 events + incident actions</CardTitle></CardHeader>
        <CardContent className="space-y-0">
          {combined.map((c,i)=>(
            <div key={c.id} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[10px] font-bold ${c.severity==='CRITICAL'?'bg-red-500/20 border-red-500/30 text-red-400': c.severity==='HIGH'?'bg-orange-500/20 border-orange-500/30 text-orange-400':'bg-white/5 border-white/10 text-sentinel-muted'}`}>
                  {c.type[0]}
                </div>
                {i<combined.length-1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
              </div>
              <div className="pb-6 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[13px] group-hover:text-white transition-colors">{c.title}</span>
                  <Badge variant={severityToVariant(c.severity)}>{c.severity}</Badge>
                  <span className="text-[11px] font-mono text-sentinel-dim">{new Date(c.time).toLocaleString()}</span>
                </div>
                <div className="text-[12px] text-sentinel-muted mt-1">{c.source}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
