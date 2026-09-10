import { useEffect, useState } from 'react';
import { SecurityPosture } from '../components/dashboard/SecurityPosture';
import { ThreatSummary } from '../components/dashboard/ThreatSummary';
import { LiveFeed } from '../components/dashboard/LiveFeed';
import { ThreatGraph } from '../components/dashboard/ThreatGraph';
import { CategoryDonut } from '../components/dashboard/CategoryDonut';
import { AssetTable } from '../components/dashboard/AssetTable';
import { HealthMap } from '../components/dashboard/HealthMap';
import { ActiveIncidents } from '../components/dashboard/ActiveIncidents';
import { getDashboardStats, getAssets, getIncidents } from '../services/api';
import { DashboardStats, Asset, Incident } from '../lib/types';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { simulateThreat } from '../services/simulation';
import { useApp } from '../store/AppContext';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const navigate = useNavigate();
  const { addNotification } = useApp();

  const load = async () => {
    const [s, a, i] = await Promise.all([getDashboardStats(), getAssets(), getIncidents()]);
    setStats(s); setAssets(a); setIncidents(i);
  };

  useEffect(()=>{ load(); const id = setInterval(load, 5000); return ()=>clearInterval(id); },[]);

  if (!stats) return <div className="text-sentinel-muted p-8">Security data loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight">Security Overview</h1>
          <p className="text-[13px] text-sentinel-muted mt-1">What is happening? How serious? What is affected? What should I do?</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" /> Live monitoring • {stats.assetsMonitored} assets • {stats.activeThreats} active threats
          </div>
        </div>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <SecurityPosture score={stats.securityScore} previousScore={stats.previousScore} change={stats.scoreChange} lastUpdated={stats.lastUpdated} />
        </div>
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <ThreatSummary counts={stats.threatCounts} onSelect={(sev)=>navigate(`/alerts?severity=${sev}`)} />
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] uppercase tracking-wide text-sentinel-muted font-semibold">Active Incidents</div>
              <div className="text-[24px] font-bold mt-1">{stats.activeIncidents}</div>
              <div className="text-[11px] text-sentinel-dim mt-1">{incidents.filter(i=>i.status==='NEW').length} new • {incidents.filter(i=>i.status==='INVESTIGATING').length} investigating</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] uppercase tracking-wide text-sentinel-muted font-semibold">Vulnerabilities</div>
              <div className="text-[24px] font-bold mt-1">{stats.vulnerabilities.critical + stats.vulnerabilities.high + stats.vulnerabilities.medium + stats.vulnerabilities.low}</div>
              <div className="text-[11px] text-sentinel-dim mt-1">{stats.vulnerabilities.critical} critical • {stats.vulnerabilities.high} high</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-amber-300">
          <Zap className="w-4 h-4" /> DEMO MODE — Simulate Threats:
        </div>
        {[
          { label: 'Port Scan', type: 'NETWORK_SCAN' },
          { label: 'Brute Force', type: 'BRUTE_FORCE' },
          { label: 'Suspicious Login', type: 'SUSPICIOUS_LOGIN' },
          { label: 'Critical Vuln', type: 'VULNERABILITY' },
          { label: 'Malware', type: 'MALWARE' },
        ].map(b=>(
          <button key={b.label} onClick={()=>{ const alert = simulateThreat(b.type as any); addNotification({ title: `Simulated: ${alert.title}`, message: `${alert.sourceIp} → ${alert.destinationIp}`, severity: alert.severity as any }); load(); }} className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-[11px] font-medium hover:bg-white/10 transition-colors">
            Simulate {b.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-amber-200/60">Flow: Event → Alert → AI Analysis → Incident → Response → Report</span>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <ThreatGraph />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <CategoryDonut />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <LiveFeed />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ActiveIncidents incidents={incidents} />
          <AssetTable assets={assets} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <HealthMap />
        </div>
      </div>

      {/* Empty state handling */}
      {stats.threatCounts.critical===0 && stats.threatCounts.high===0 && (
        <div className="p-8 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <div className="text-[16px] font-bold text-emerald-300">SYSTEM SECURE</div>
          <div className="text-[13px] text-emerald-200/60 mt-1">No active critical threats detected. Last scan 2 minutes ago. Assets monitored: {stats.assetsMonitored}</div>
        </div>
      )}
    </div>
  );
}
