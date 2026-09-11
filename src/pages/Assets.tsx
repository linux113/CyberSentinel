import { useEffect, useState } from 'react';
import { getAssets } from '../services/api';
import { Asset } from '../lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { Search, Server } from 'lucide-react';

export function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [type, setType] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');

  const load = async () => {
    const data = await getAssets({ type, status, search });
    setAssets(data);
  };

  useEffect(()=>{ load(); },[type, status, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Asset Inventory</h1>
          <p className="text-[13px] text-sentinel-muted mt-1">{assets.length} assets monitored Servers, endpoints, databases, network, applications, cloud</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex gap-3">
          <select value={type} onChange={e=>setType(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
            <option value="ALL">All Types</option>
            <option value="SERVER">Server</option>
            <option value="ENDPOINT">Endpoint</option>
            <option value="DATABASE">Database</option>
            <option value="NETWORK">Network</option>
            <option value="APPLICATION">Application</option>
            <option value="CLOUD">Cloud</option>
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
            <option value="ALL">All Status</option>
            <option value="HEALTHY">Healthy</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search assets, IPs..." className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px]" />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map(a=>(
          <Link key={a.id} to={`/assets/${a.id}`}>
            <Card className="hover:bg-white/[0.04] transition-colors h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                      <Server className="w-5 h-5 text-sentinel-muted" />
                    </div>
                    <div>
                      <div className="font-semibold text-[14px]">{a.name}</div>
                      <div className="text-[11px] font-mono text-sentinel-dim">{a.ip} {a.type}</div>
                    </div>
                  </div>
                  <Badge variant={severityToVariant(a.status)}>{a.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                  <div><div className="text-sentinel-dim">Risk</div><div className={`font-bold font-mono text-[13px] ${a.riskScore>=80?'text-red-400':a.riskScore>=60?'text-orange-400':a.riskScore>=30?'text-yellow-400':'text-emerald-400'}`}>{a.riskScore}</div></div>
                  <div><div className="text-sentinel-dim">Vulns</div><div className="font-mono font-medium">{a.vulnerabilities}</div></div>
                  <div><div className="text-sentinel-dim">Alerts</div><div className="font-mono font-medium">{a.activeAlerts}</div></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {a.tags.map(t=><span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[10px]">{t}</span>)}
                </div>
                <div className="mt-3 text-[11px] font-mono text-sentinel-dim">Last seen {new Date(a.lastSeen).toLocaleTimeString()} OS: {a.os}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
