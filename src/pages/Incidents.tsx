import { useEffect, useState } from 'react';
import { getIncidents } from '../services/api';
import { Incident } from '../lib/types';
import { Card, CardContent } from '../components/ui/Card';
import { Badge, severityToVariant } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const load = async () => {
    const data = await getIncidents({ status, search });
    setIncidents(data);
  };

  useEffect(()=>{ load(); },[status, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Incident Management</h1>
          <p className="text-[13px] text-sentinel-muted mt-1">NEW → INVESTIGATING → CONTAINED → RESOLVED → CLOSED</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex gap-3">
          <select value={status} onChange={e=>setStatus(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="CONTAINED">Contained</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search incidents..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px]" />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {incidents.map(inc=>(
          <Link key={inc.id} to={`/incidents/${inc.id}`}>
            <Card className="hover:bg-white/[0.03] transition-colors h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-sky-400">{inc.id}</span>
                      <Badge variant={severityToVariant(inc.severity)}>{inc.severity}</Badge>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{inc.status}</span>
                      {inc.isSimulation && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">Sim</span>}
                    </div>
                    <div className="font-semibold text-[14px] mt-2">{inc.title}</div>
                    <div className="text-[12px] text-sentinel-muted mt-1 line-clamp-2">{inc.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-sentinel-dim">Risk</div>
                    <div className={`font-bold font-mono ${inc.riskScore>=85?'text-red-400':inc.riskScore>=60?'text-orange-400':'text-yellow-400'}`}>{inc.riskScore}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 text-[11px] text-sentinel-muted">
                  <span>{new Date(inc.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{inc.affectedAssets.length} assets</span>
                  <span>•</span>
                  <span>{inc.relatedAlerts.length} alerts</span>
                  {inc.assignedTo && <><span>•</span><span>{inc.assignedTo}</span></>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
