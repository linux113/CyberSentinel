import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getThreatActivity } from '../../services/api';

export function ThreatGraph() {
  const [data, setData] = useState<any[]>([]);
  const [range, setRange] = useState<'24h'|'7d'|'30d'>('24h');

  useEffect(()=>{ getThreatActivity().then(setData); },[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Activity Over Time</CardTitle>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          {(['24h','7d','30d'] as const).map(r=>(
            <button key={r} onClick={()=>setRange(r)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${range===r?'bg-white/[0.08] text-white border border-white/10':'text-sentinel-muted hover:text-white'}`}>{r.toUpperCase()}</button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="crit" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
              <linearGradient id="high" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/><stop offset="95%" stopColor="#f97316" stopOpacity={0}/></linearGradient>
              <linearGradient id="med" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#eab308" stopOpacity={0.2}/><stop offset="95%" stopColor="#eab308" stopOpacity={0}/></linearGradient>
              <linearGradient id="low" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#5a6d85', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#5a6d85', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: '#0f1720', border: '1px solid #1c2e42', borderRadius: '8px', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#8a9bb0' }} />
            <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="url(#crit)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="high" stackId="1" stroke="#f97316" fill="url(#high)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="medium" stackId="1" stroke="#eab308" fill="url(#med)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="low" stackId="1" stroke="#3b82f6" fill="url(#low)" strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
