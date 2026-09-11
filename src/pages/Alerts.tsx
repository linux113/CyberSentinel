import { useEffect, useState } from 'react';
import { getAlerts } from '../services/api';
import { Alert } from '../lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant, riskToVariant } from '../components/ui/Badge';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../store/AppContext';

export function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const { searchQuery } = useApp();

  useEffect(()=>{
    const sev = searchParams.get('severity');
    if (sev) setFilterSeverity(sev);
  },[searchParams]);

  useEffect(()=>{
    if (searchQuery) setSearch(searchQuery);
  },[searchQuery]);

  const load = async () => {
    const data = await getAlerts({ severity: filterSeverity, status: filterStatus, search });
    setAlerts(data);
  };

  useEffect(()=>{ load(); },[filterSeverity, filterStatus, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Alert Center</h1>
          <p className="text-[13px] text-sentinel-muted mt-1">SOC workflow: triage, investigate, analyze, escalate</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[12px] font-mono">{alerts.length} alerts</div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-sentinel-dim" />
            <select value={filterSeverity} onChange={e=>setFilterSeverity(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
              <option value="ALL">All Status</option>
              <option value="NEW">New</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="CONTAINED">Contained</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div className="flex-1 min-w-[240px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search alerts, IPs, types..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-sentinel-muted border-b border-white/[0.06] bg-white/[0.02]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Alert</th>
                <th className="text-left px-3 py-3 font-medium">Source → Dest</th>
                <th className="text-left px-3 py-3 font-medium">Type</th>
                <th className="text-left px-3 py-3 font-medium">Severity</th>
                <th className="text-left px-3 py-3 font-medium">Risk</th>
                <th className="text-left px-3 py-3 font-medium">Time</th>
                <th className="text-left px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {alerts.map(a=>(
                <tr key={a.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-4 py-3">
                    <Link to={`/alerts/${a.id}`} className="block">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-sky-400">{a.id}</span>
                        {a.isSimulation && <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">Sim</span>}
                      </div>
                      <div className="font-medium group-hover:text-white transition-colors truncate max-w-[260px]">{a.title}</div>
                      <div className="text-[11px] text-sentinel-dim truncate max-w-[260px]">{a.sensor} • {a.signature}</div>
                    </Link>
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px]">
                    <div className="text-sentinel-text">{a.sourceIp}:{a.sourcePort}</div>
                    <div className="text-sentinel-muted">→ {a.destinationIp}:{a.destinationPort}</div>
                  </td>
                  <td className="px-3 py-3"><Badge variant="neutral">{a.type.replace('_',' ')}</Badge></td>
                  <td className="px-3 py-3"><Badge variant={severityToVariant(a.severity)} pulse={a.severity==='CRITICAL'}>{a.severity}</Badge></td>
                  <td className="px-3 py-3"><Badge variant={riskToVariant(a.riskScore)}>{a.riskScore}</Badge></td>
                  <td className="px-3 py-3 text-[11px] font-mono text-sentinel-muted">{new Date(a.timestamp).toLocaleString()}</td>
                  <td className="px-3 py-3"><span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
