import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAlert, analyzeAlert, createIncidentFromAlert } from '../services/api';
import { Alert } from '../lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant, riskToVariant } from '../components/ui/Badge';
import { Brain, ShieldAlert, Clock, Server, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { GradientButton, CyberButton, RainbowBorderButton, ShimmerButton } from '@/components/ui/21-button';
import { PremiumCard, GlassCard } from '@/components/ui/21-card';

export function AlertDetail() {
  const { id } = useParams();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{ if(id) getAlert(id).then(a=>setAlert(a||null)); },[id]);

  const handleAnalyze = async () => {
    if (!alert) return;
    setAnalyzing(true);
    const analysis = await analyzeAlert(alert.id);
    setAlert({ ...alert, aiAnalysis: analysis });
    setAnalyzing(false);
  };

  const handleCreateIncident = async () => {
    if (!alert) return;
    const inc = await createIncidentFromAlert(alert.id);
    navigate(`/incidents/${inc.id}`);
  };

  if (!alert) return <div className="p-8 text-sentinel-muted flex items-center gap-2"><div className="w-4 h-4 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" /> Loading alert...</div>;

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-center gap-2 text-[12px] text-sentinel-muted">
        <Link to="/alerts" className="hover:text-white flex items-center gap-1"><ArrowRight className="w-3 h-3 rotate-180" /> Alerts</Link>
        <span>→</span>
        <span className="text-white font-mono">{alert.id}</span>
        {alert.isSimulation && <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] uppercase font-bold backdrop-blur-xl">Simulation — Not Real Telemetry </span>}
        {!alert.isSimulation && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] uppercase font-bold">REAL Suricata </span>}
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3 flex-wrap">
            {alert.title}
            <Badge variant={severityToVariant(alert.severity)}>{alert.severity}</Badge>
            <Badge variant={riskToVariant(alert.riskScore)}>Risk {alert.riskScore}</Badge>
            
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-2 max-w-[700px]">{alert.description}</p>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap">
          <GradientButton onClick={handleAnalyze} className={analyzing ? 'opacity-50' : ''}>
            <Brain className="w-4 h-4" /> {analyzing ? 'Analyzing...' : 'Analyze with AI'} <Sparkles className="w-3 h-3" />
          </GradientButton>
          <RainbowBorderButton onClick={handleCreateIncident}>
            <ShieldAlert className="w-4 h-4" /> Create Incident
          </RainbowBorderButton>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <PremiumCard gradient="default">
            <CardHeader><CardTitle>Overview </CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-[13px]">
              <div className="space-y-3">
                <div><span className="text-sentinel-muted">Alert ID:</span> <span className="font-mono px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">{alert.id}</span></div>
                <div><span className="text-sentinel-muted">Threat Type:</span> <Badge variant="neutral">{alert.type}</Badge></div>
                <div><span className="text-sentinel-muted">Sensor:</span> <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">{alert.sensor}</span></div>
                <div><span className="text-sentinel-muted">Signature:</span> <span className="font-mono text-[11px] px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">{alert.signature}</span></div>
                <div><span className="text-sentinel-muted">Status:</span> <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] backdrop-blur-xl">{alert.status}</span></div>
              </div>
              <div className="space-y-3">
                <div><span className="text-sentinel-muted">Source IP:</span> <span className="font-mono px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-300">{alert.sourceIp}:{alert.sourcePort}</span></div>
                <div><span className="text-sentinel-muted">Destination IP:</span> <span className="font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-300">{alert.destinationIp}:{alert.destinationPort}</span></div>
                <div><span className="text-sentinel-muted">Protocol:</span> <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px]">{alert.protocol}</span></div>
                <div><span className="text-sentinel-muted">Timestamp:</span> <span className="font-mono text-[11px]">{new Date(alert.timestamp).toLocaleString()}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-sentinel-dim" /><span className="text-sentinel-muted">Asset:</span> <Link to={`/assets/${alert.assetId}`} className="text-sky-400 hover:text-sky-300 flex items-center gap-1 px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20"><Server className="w-3 h-3" />{alert.assetId}</Link></div>
              </div>
            </CardContent>
          </PremiumCard>

          <PremiumCard gradient="sky">
            <CardHeader><CardTitle>Why Was This Detected? Evidence</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[13px] leading-relaxed p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">{alert.evidence.description}</p>
              <div>
                <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2 flex items-center gap-2">
                  <div className="w-1 h-3 bg-sky-400 rounded-full" /> Indicators 
                </div>
                <div className="flex flex-wrap gap-2">
                  {alert.evidence.indicators.map((ind,i)=>(
                    <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono hover:bg-white/[0.06] hover:border-white/[0.10] hover:scale-[1.02] transition-all backdrop-blur-xl">{ind}</span>
                  ))}
                </div>
              </div>
              {alert.evidence.rawLogSnippet && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2">Raw Log Snippet Real Evidence</div>
                  <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.06] text-[11px] font-mono overflow-x-auto text-sentinel-muted backdrop-blur-xl">{alert.evidence.rawLogSnippet}</pre>
                </div>
              )}
            </CardContent>
          </PremiumCard>

          {alert.aiAnalysis && (
            <PremiumCard gradient={alert.severity==='CRITICAL'?'red':alert.severity==='HIGH'?'amber':'sky'} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="w-4 h-4 text-sky-400" /> AI Threat Analysis — Confidence {alert.aiAnalysis.confidence}% </CardTitle>
                <span className="text-[11px] font-mono text-sentinel-dim px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">{new Date(alert.aiAnalysis.timestamp).toLocaleString()}</span>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <GlassCard className="p-4">
                    <h4 className="text-[11px] font-bold tracking-wide uppercase text-sky-300 mb-2 flex items-center gap-2"><div className="w-1 h-3 bg-sky-400 rounded-full" /> Assessment — What Happened?</h4>
                    <p className="text-[13px] leading-relaxed text-sentinel-text">{alert.aiAnalysis.whatHappened}</p>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <h4 className="text-[11px] font-bold tracking-wide uppercase text-amber-300 mb-2 flex items-center gap-2"><div className="w-1 h-3 bg-amber-400 rounded-full" /> Why Is It Suspicious?</h4>
                    <p className="text-[13px] leading-relaxed">{alert.aiAnalysis.whySuspicious}</p>
                  </GlassCard>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-xl">
                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-emerald-300 mb-2">Observed Evidence Real</h4>
                    <ul className="space-y-2">
                      {alert.aiAnalysis.observedEvidence.map((e,i)=><li key={i} className="text-[12px] flex gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />{e}</li>)}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 backdrop-blur-xl">
                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-amber-300 mb-2">Inference (Not Confirmed) AI</h4>
                    <ul className="space-y-2">
                      {alert.aiAnalysis.inference.map((e,i)=><li key={i} className="text-[12px] flex gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />{e}</li>)}
                    </ul>
                  </div>
                </div>

                <GlassCard className="p-4 border-red-500/20 bg-red-500/5">
                  <h4 className="text-[11px] font-bold tracking-wide uppercase text-red-300 mb-2">Risk Assessment </h4>
                  <p className="text-[13px] leading-relaxed">{alert.aiAnalysis.riskAssessment}</p>
                </GlassCard>

                <div className="grid md:grid-cols-2 gap-4">
                  <GlassCard className="p-4">
                    <h4 className="text-[11px] font-bold tracking-wide uppercase text-orange-300 mb-2">Potential Impact</h4>
                    <p className="text-[13px] leading-relaxed">{alert.aiAnalysis.potentialImpact}</p>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <h4 className="text-[11px] font-bold tracking-wide uppercase text-emerald-300 mb-2">Recommended Actions </h4>
                    <ol className="space-y-2">
                      {alert.aiAnalysis.recommendedActions.map((a,i)=>(
                        <li key={i} className="flex gap-3 text-[12px] p-2 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"><span className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-[11px] font-mono shrink-0 text-white">{i+1}</span><span>{a}</span></li>
                      ))}
                    </ol>
                  </GlassCard>
                </div>

                <div className="text-[11px] text-sentinel-dim italic border-t border-white/[0.06] pt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <span className="font-bold text-amber-300">AI Safety:</span> This analysis distinguishes observed evidence vs inference. It does not claim attack is confirmed unless evidence supports it. If insufficient evidence, it states "Insufficient evidence to determine conclusively." 
                </div>
              </CardContent>
            </PremiumCard>
          )}
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <PremiumCard gradient="default">
            <CardHeader><CardTitle>Workflow </CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'Live Threat', done: true },
                { label: 'Alert', done: true, current: true },
                { label: 'Evidence', done: true },
                { label: 'Risk Score', done: true },
                { label: 'AI Analysis', done: !!alert.aiAnalysis },
                { label: 'Incident', done: false },
                { label: 'Response', done: false },
                { label: 'Report', done: false },
              ].map((s,i)=>(
                <div key={s.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-all group">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border backdrop-blur-xl ${s.done?'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]': s.current?'bg-sky-500/20 text-sky-400 border-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.2)] animate-pulse':'bg-white/5 text-sentinel-dim border-white/10'}`}>
                    {s.done?'✓':i+1}
                  </div>
                  <span className={`text-[13px] ${s.current?'text-white font-semibold': s.done?'text-sentinel-text':'text-sentinel-muted'} group-hover:text-white transition-colors`}>{s.label}</span>
                  {s.current && <ArrowRight className="w-3 h-3 text-sky-400 ml-auto group-hover:translate-x-1 transition-transform" />}
                </div>
              ))}
            </CardContent>
          </PremiumCard>

          <PremiumCard gradient="sky">
            <CardHeader><CardTitle>Recommended Response </CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {(alert.recommendation || []).map((r,i)=>(
                <div key={i} className="flex gap-2 text-[12px] p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all backdrop-blur-xl"><span className="text-sky-400 mt-0.5">•</span><span>{r}</span></div>
              ))}
            </CardContent>
          </PremiumCard>

          <PremiumCard gradient="violet">
            <CardHeader><CardTitle>Next Steps </CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <ShimmerButton variant="secondary" className="w-full justify-start" onClick={handleAnalyze}>
                <Brain className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium text-[13px]">Analyze with AI</div>
                  <div className="text-[11px] text-white/50">Get structured defensive analysis</div>
                </div>
              </ShimmerButton>
              <RainbowBorderButton className="w-full" onClick={handleCreateIncident}>
                <ShieldAlert className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium text-[13px]">Create Incident</div>
                  <div className="text-[11px] text-white/50">Escalate to incident response</div>
                </div>
              </RainbowBorderButton>
              <Link to="/threat-intel" className="block">
                <CyberButton variant="secondary" className="w-full justify-start">
                  <Server className="w-4 h-4" />
                  <div className="text-left">
                    <div className="font-medium text-[13px]">Investigate IP</div>
                    <div className="text-[11px] text-white/50">Check reputation of {alert.sourceIp}</div>
                  </div>
                </CyberButton>
              </Link>
            </CardContent>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}
