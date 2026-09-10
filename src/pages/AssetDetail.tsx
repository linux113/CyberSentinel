import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAsset, getAlerts, getVulnerabilities } from '../services/api';
import { Asset, Alert, Vulnerability } from '../lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge, severityToVariant } from '../components/ui/Badge';

export function AssetDetail() {
  const { id } = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [vulns, setVulns] = useState<Vulnerability[]>([]);

  useEffect(()=>{
    if (!id) return;
    getAsset(id).then(a=>{
      if (!a) return;
      setAsset(a);
      getAlerts({ search: a.ip }).then(setAlerts);
      getVulnerabilities({ search: a.name }).then(setVulns);
    });
  },[id]);

  if (!asset) return <div className="p-8 text-sentinel-muted">Loading asset...</div>;

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-center gap-2 text-[12px] text-sentinel-muted">
        <Link to="/assets" className="hover:text-white">Assets</Link>
        <span>→</span>
        <span className="text-white font-mono">{asset.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
            {asset.name}
            <Badge variant={severityToVariant(asset.status)}>{asset.status}</Badge>
            <span className={`font-mono text-[14px] px-2 py-1 rounded-lg border ${asset.riskScore>=80?'bg-red-500/10 border-red-500/20 text-red-400': asset.riskScore>=60?'bg-orange-500/10 border-orange-500/20 text-orange-400':'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>Risk {asset.riskScore}</span>
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-1 font-mono">{asset.ip} • {asset.type} • {asset.os}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-[13px]">
              <div className="space-y-2">
                <div><span className="text-sentinel-muted">ID:</span> <span className="font-mono">{asset.id}</span></div>
                <div><span className="text-sentinel-muted">IP:</span> <span className="font-mono">{asset.ip}</span></div>
                <div><span className="text-sentinel-muted">Type:</span> {asset.type}</div>
                <div><span className="text-sentinel-muted">OS:</span> {asset.os}</div>
              </div>
              <div className="space-y-2">
                <div><span className="text-sentinel-muted">Status:</span> <Badge variant={severityToVariant(asset.status)}>{asset.status}</Badge></div>
                <div><span className="text-sentinel-muted">Risk:</span> {asset.riskScore}</div>
                <div><span className="text-sentinel-muted">Open Ports:</span> <span className="font-mono">{asset.openPorts.join(', ') || 'None'}</span></div>
                <div><span className="text-sentinel-muted">Last Seen:</span> {new Date(asset.lastSeen).toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Active Alerts ({alerts.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {alerts.slice(0,5).map(a=>(
                <Link key={a.id} to={`/alerts/${a.id}`} className="block p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]">
                  <div className="flex items-center gap-2"><span className="font-mono text-[11px] text-sky-400">{a.id}</span><Badge variant={severityToVariant(a.severity)}>{a.severity}</Badge></div>
                  <div className="text-[13px] font-medium mt-1">{a.title}</div>
                </Link>
              ))}
              {alerts.length===0 && <div className="text-[13px] text-sentinel-muted">No active alerts</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Vulnerabilities ({vulns.length})</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {vulns.slice(0,5).map(v=>(
                <div key={v.id} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2"><span className="font-medium text-[13px]">{v.name}</span><Badge variant={severityToVariant(v.severity)}>{v.severity}</Badge><span className="font-mono text-[11px]">CVSS {v.cvss}</span></div>
                  <div className="text-[11px] text-sentinel-muted mt-1">{v.cve}</div>
                </div>
              ))}
              {vulns.length===0 && <div className="text-[13px] text-sentinel-muted">No vulnerabilities</div>}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader><CardTitle>Security Health</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-400 to-red-500" style={{ width: `${asset.riskScore}%` }} /></div>
              <div className="text-[11px] text-sentinel-muted">Risk score {asset.riskScore}/100 — {asset.status}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {asset.tags.map(t=><span key={t} className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px]">{t}</span>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
