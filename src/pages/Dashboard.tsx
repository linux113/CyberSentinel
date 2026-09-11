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
import { Zap, Activity, Shield } from 'lucide-react';
import { simulateThreat } from '../services/simulation';
import { useApp } from '../store/AppContext';
import { CyberButton, RainbowBorderButton, StatusButton, ShimmerButton } from '@/components/ui/21-button';
import { PremiumCard, GlassCard } from '@/components/ui/21-card';

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

  if (!stats) return <div className="text-sentinel-muted p-8 flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" /> Security data loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header - 21.dev style */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight flex items-center gap-3">
            Security Overview
            <span className="text-[10px] px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-bold tracking-widest">21.DEV PREMIUM</span>
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-1 flex items-center gap-2">
            What is happening? How serious? What is affected? What should I do?
            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono">MONITOR → RESPOND</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusButton status="online">Live monitoring • {stats.assetsMonitored} assets • {stats.activeThreats} threats</StatusButton>
          <CyberButton variant="primary" icon={<Activity className="w-3.5 h-3.5" />}>Live</CyberButton>
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
            <PremiumCard gradient="violet" className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wide text-sentinel-muted font-semibold">Active Incidents</div>
                <Shield className="w-4 h-4 text-violet-400" />
              </div>
              <div className="text-[28px] font-bold mt-2">{stats.activeIncidents}</div>
              <div className="text-[11px] text-sentinel-dim mt-1 flex gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">{incidents.filter(i=>i.status==='NEW').length} new</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300">{incidents.filter(i=>i.status==='INVESTIGATING').length} investigating</span>
              </div>
            </PremiumCard>
            <PremiumCard gradient="sky" className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-wide text-sentinel-muted font-semibold">Vulnerabilities</div>
                <Activity className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-[28px] font-bold mt-2">{stats.vulnerabilities.critical + stats.vulnerabilities.high + stats.vulnerabilities.medium + stats.vulnerabilities.low}</div>
              <div className="text-[11px] text-sentinel-dim mt-1 flex gap-2">
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300">{stats.vulnerabilities.critical} critical</span>
                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300">{stats.vulnerabilities.high} high</span>
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>

      {/* Demo Controls - 21.dev style with CyberButton */}
      <PremiumCard gradient="amber" className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-amber-300">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            DEMO MODE — Simulate Threats:
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">21.DEV</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Port Scan', type: 'NETWORK_SCAN' },
              { label: 'Brute Force', type: 'BRUTE_FORCE' },
              { label: 'Suspicious Login', type: 'SUSPICIOUS_LOGIN' },
              { label: 'Critical Vuln', type: 'VULNERABILITY' },
              { label: 'Malware', type: 'MALWARE' },
            ].map(b=>(
              <CyberButton 
                key={b.label} 
                variant="secondary"
                onClick={()=>{ const alert = simulateThreat(b.type as any); addNotification({ title: `Simulated: ${alert.title}`, message: `${alert.sourceIp} → ${alert.destinationIp}`, severity: alert.severity as any }); load(); }}
              >
                Simulate {b.label}
              </CyberButton>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <RainbowBorderButton variant="small">Flow: Event → Alert → AI → Incident → Response → Report</RainbowBorderButton>
          </div>
        </div>
      </PremiumCard>

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

      {/* Empty state handling - 21.dev */}
      {stats.threatCounts.critical===0 && stats.threatCounts.high===0 && (
        <PremiumCard gradient="emerald" className="p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-[16px] font-bold text-emerald-300">SYSTEM SECURE</div>
          <div className="text-[13px] text-emerald-200/60 mt-1">No active critical threats detected. Last scan 2 minutes ago. Assets monitored: {stats.assetsMonitored}</div>
          <div className="mt-4 flex justify-center gap-2">
            <StatusButton status="online">All Clear</StatusButton>
            <CyberButton variant="success">Secure</CyberButton>
          </div>
        </PremiumCard>
      )}
    </div>
  );
}
