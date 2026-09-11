import { useEffect, useState } from 'react';
import { getVulnerabilities } from '../services/api';
import { Vulnerability } from '../lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant } from '../components/ui/Badge';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VulnerabilitiesPage() {
  const [vulns, setVulns] = useState<Vulnerability[]>([]);
  const [severity, setSeverity] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const load = async () => {
    const data = await getVulnerabilities({ severity, status, search });
    setVulns(data);
  };

  useEffect(()=>{ load(); },[severity, status, search]);

  const counts = {
    critical: vulns.filter(v=>v.severity==='CRITICAL'&&v.status==='OPEN').length,
    high: vulns.filter(v=>v.severity==='HIGH'&&v.status==='OPEN').length,
    medium: vulns.filter(v=>v.severity==='MEDIUM'&&v.status==='OPEN').length,
    low: vulns.filter(v=>v.severity==='LOW'&&v.status==='OPEN').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Vulnerability Management</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Track, prioritize, remediate</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Critical', value: counts.critical, color: 'text-red-400 border-red-500/20 bg-red-500/10' },
          { label: 'High', value: counts.high, color: 'text-orange-400 border-orange-500/20 bg-orange-500/10' },
          { label: 'Medium', value: counts.medium, color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/10' },
          { label: 'Low', value: counts.low, color: 'text-blue-400 border-blue-500/20 bg-blue-500/10' },
        ].map(c=>(
          <Card key={c.label} className={`border ${c.color.split(' ').slice(1).join(' ')}`}><CardContent className="p-4"><div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted">{c.label}</div><div className={`text-[24px] font-bold mt-1 ${c.color.split(' ')[0]}`}>{c.value}</div></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4 flex gap-3">
          <select value={severity} onChange={e=>setSeverity(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="PATCHED">Patched</option>
            <option value="MITIGATED">Mitigated</option>
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search vulnerabilities, assets, CVE..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-sentinel-muted border-b border-white/[0.06] bg-white/[0.02]">
              <tr>
                <th className="text-left px-4 py-3">Vulnerability</th>
                <th className="text-left px-3 py-3">Asset</th>
                <th className="text-left px-3 py-3">Severity</th>
                <th className="text-left px-3 py-3">CVSS</th>
                <th className="text-left px-3 py-3">Status</th>
                <th className="text-left px-3 py-3">Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {vulns.map(v=>(
                <tr key={v.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">
                    <div className="font-medium">{v.name}</div>
                    <div className="text-[11px] font-mono text-sentinel-dim">{v.cve} {v.id}</div>
                  </td>
                  <td className="px-3 py-3"><Link to={`/assets/${v.assetId}`} className="text-sky-400 hover:text-sky-300">{v.asset}</Link></td>
                  <td className="px-3 py-3"><Badge variant={severityToVariant(v.severity)}>{v.severity}</Badge></td>
                  <td className="px-3 py-3 font-mono font-bold">{v.cvss}</td>
                  <td className="px-3 py-3"><span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{v.status}</span></td>
                  <td className="px-3 py-3 text-[11px] font-mono text-sentinel-muted">{new Date(v.detectedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
