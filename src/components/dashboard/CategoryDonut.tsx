import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import { getThreatCategories } from '../../services/api';

export function CategoryDonut() {
  const [data, setData] = useState<any[]>([]);
  useEffect(()=>{ getThreatCategories().then(setData); },[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Categories</CardTitle>
        <span className="text-[11px] text-sentinel-dim font-mono">Last 7 days</span>
      </CardHeader>
      <CardContent className="h-[280px] flex">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
                {data.map((entry, idx)=> <Cell key={idx} fill={entry.color} stroke="rgba(0,0,0,0.3)" />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f1720', border: '1px solid #1c2e42', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[140px] space-y-2 py-2">
          {data.map((d)=>(
            <div key={d.name} className="flex items-center gap-2 text-[11px]">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-sentinel-muted flex-1 truncate">{d.name}</span>
              <span className="font-mono font-medium">{d.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
