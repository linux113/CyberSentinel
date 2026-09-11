import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant } from '../ui/Badge';
import { Incident } from '../../lib/types';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export function ActiveIncidents({ incidents }: { incidents: Incident[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Incidents</CardTitle>
        <Link to="/incidents" className="text-[11px] text-sky-400 hover:text-sky-300">View all →</Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/[0.04]">
          {incidents.slice(0,5).map(inc=>(
            <Link key={inc.id} to={`/incidents/${inc.id}`} className="block p-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-sky-400">{inc.id}</span>
                    <Badge variant={severityToVariant(inc.severity)}>{inc.severity}</Badge>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10">{inc.status}</span>
                  </div>
                  <div className="text-[13px] font-medium mt-1 truncate">{inc.title}</div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-sentinel-muted">
                    <Clock className="w-3 h-3" />
                    {new Date(inc.createdAt).toLocaleTimeString()} Risk {inc.riskScore}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 ${inc.severity==='CRITICAL'?'bg-red-500 animate-pulse-subtle': inc.severity==='HIGH'?'bg-orange-500':'bg-yellow-500'}`} />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
