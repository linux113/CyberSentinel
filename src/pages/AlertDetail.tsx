import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getAlert, analyzeAlert, createIncidentFromAlert } from '../services/api';
import { Alert } from '../lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge, severityToVariant, riskToVariant } from '../components/ui/Badge';
import { Brain, ShieldAlert, Clock, Server, ArrowRight, CheckCircle } from 'lucide-react';

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

  if (!alert) return <div className="p-8 text-sentinel-muted">Loading alert...</div>;

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-center gap-2 text-[12px] text-sentinel-muted">
        <Link to="/alerts" className="hover:text-white">Alerts</Link>
        <span>→</span>
        <span className="text-white font-mono">{alert.id}</span>
        {alert.isSimulation && <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] uppercase font-bold">Simulation — Not Real Telemetry</span>}
      </div>

      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
            {alert.title}
            <Badge variant={severityToVariant(alert.severity)}>{alert.severity}</Badge>
            <Badge variant={riskToVariant(alert.riskScore)}>Risk {alert.riskScore}</Badge>
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-2 max-w-[700px]">{alert.description}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={handleAnalyze} disabled={analyzing} className="px-4 py-2 rounded-xl bg-sky-500 text-white font-semibold text-[13px] flex items-center gap-2 hover:bg-sky-400 transition-colors disabled:opacity-50">
            <Brain className="w-4 h-4" /> {analyzing ? 'Analyzing...' : 'Analyze with AI'}
          </button>
          <button onClick={handleCreateIncident} className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] font-medium text-[13px] flex items-center gap-2 hover:bg-white/[0.1]">
            <ShieldAlert className="w-4 h-4" /> Create Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-[13px]">
              <div className="space-y-3">
                <div><span className="text-sentinel-muted">Alert ID:</span> <span className="font-mono">{alert.id}</span></div>
                <div><span className="text-sentinel-muted">Threat Type:</span> <Badge variant="neutral">{alert.type}</Badge></div>
                <div><span className="text-sentinel-muted">Sensor:</span> {alert.sensor}</div>
                <div><span className="text-sentinel-muted">Signature:</span> <span className="font-mono text-[11px]">{alert.signature}</span></div>
                <div><span className="text-sentinel-muted">Status:</span> <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px]">{alert.status}</span></div>
              </div>
              <div className="space-y-3">
                <div><span className="text-sentinel-muted">Source IP:</span> <span className="font-mono">{alert.sourceIp}:{alert.sourcePort}</span></div>
                <div><span className="text-sentinel-muted">Destination IP:</span> <span className="font-mono">{alert.destinationIp}:{alert.destinationPort}</span></div>
                <div><span className="text-sentinel-muted">Protocol:</span> {alert.protocol}</div>
                <div><span className="text-sentinel-muted">Timestamp:</span> <span className="font-mono text-[11px]">{new Date(alert.timestamp).toLocaleString()}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-sentinel-dim" /><span className="text-sentinel-muted">Asset:</span> <Link to={`/assets/${alert.assetId}`} className="text-sky-400 hover:text-sky-300 flex items-center gap-1"><Server className="w-3 h-3" />{alert.assetId}</Link></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Why Was This Detected?</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[13px] leading-relaxed">{alert.evidence.description}</p>
              <div>
                <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2">Indicators</div>
                <div className="flex flex-wrap gap-2">
                  {alert.evidence.indicators.map((ind,i)=>(
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono">{ind}</span>
                  ))}
                </div>
              </div>
              {alert.evidence.rawLogSnippet && (
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2">Raw Log Snippet</div>
                  <pre className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-[11px] font-mono overflow-x-auto text-sentinel-muted">{alert.evidence.rawLogSnippet}</pre>
                </div>
              )}
            </CardContent>
          </Card>

          {alert.aiAnalysis && (
            <Card glow={alert.severity==='CRITICAL'?'critical':alert.severity==='HIGH'?'high':'none'}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="w-4 h-4 text-sky-400" /> AI Threat Analysis — Confidence {alert.aiAnalysis.confidence}%</CardTitle>
                <span className="text-[11px] font-mono text-sentinel-dim">{new Date(alert.aiAnalysis.timestamp).toLocaleString()}</span>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[12px] font-bold tracking-wide uppercase text-sky-300 mb-2">Assessment — What Happened?</h4>
                    <p className="text-[13px] leading-relaxed text-sentinel-text">{alert.aiAnalysis.whatHappened}</p>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold tracking-wide uppercase text-amber-300 mb-2">Why Is It Suspicious?</h4>
                    <p className="text-[13px] leading-relaxed">{alert.aiAnalysis.whySuspicious}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-sentinel-muted mb-2">Observed Evidence</h4>
                    <ul className="space-y-1.5">
                      {alert.aiAnalysis.observedEvidence.map((e,i)=><li key={i} className="text-[12px] flex gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />{e}</li>)}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <h4 className="text-[11px] font-bold uppercase tracking-wide text-sentinel-muted mb-2">Inference (Not Confirmed)</h4>
                    <ul className="space-y-1.5">
                      {alert.aiAnalysis.inference.map((e,i)=><li key={i} className="text-[12px] flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />{e}</li>)}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-[12px] font-bold tracking-wide uppercase text-red-300 mb-2">Risk Assessment</h4>
                  <p className="text-[13px] leading-relaxed p-3 rounded-lg bg-red-500/10 border border-red-500/20">{alert.aiAnalysis.riskAssessment}</p>
                </div>

                <div>
                  <h4 className="text-[12px] font-bold tracking-wide uppercase text-orange-300 mb-2">Potential Impact</h4>
                  <p className="text-[13px] leading-relaxed">{alert.aiAnalysis.potentialImpact}</p>
                </div>

                <div>
                  <h4 className="text-[12px] font-bold tracking-wide uppercase text-emerald-300 mb-2">Recommended Actions</h4>
                  <ol className="space-y-2">
                    {alert.aiAnalysis.recommendedActions.map((a,i)=>(
                      <li key={i} className="flex gap-3 text-[13px]"><span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[11px] font-mono shrink-0">{i+1}</span><span>{a}</span></li>
                    ))}
                  </ol>
                </div>

                <div className="text-[11px] text-sentinel-dim italic border-t border-white/[0.06] pt-4">
                  AI Safety: This analysis distinguishes observed evidence vs inference. It does not claim attack is confirmed unless evidence supports it. If insufficient evidence, it states "Insufficient evidence to determine conclusively."
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader><CardTitle>Workflow</CardTitle></CardHeader>
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
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${s.done?'bg-emerald-500/20 text-emerald-400 border-emerald-500/30': s.current?'bg-sky-500/20 text-sky-400 border-sky-500/30':'bg-white/5 text-sentinel-dim border-white/10'}`}>
                    {s.done?'✓':i+1}
                  </div>
                  <span className={`text-[13px] ${s.current?'text-white font-semibold': s.done?'text-sentinel-text':'text-sentinel-muted'}`}>{s.label}</span>
                  {s.current && <ArrowRight className="w-3 h-3 text-sky-400 ml-auto" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recommended Response</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {(alert.recommendation || []).map((r,i)=>(
                <div key={i} className="flex gap-2 text-[12px]"><span className="text-sky-400">•</span>{r}</div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Next Steps</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <button onClick={handleAnalyze} className="w-full text-left p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] transition-colors">
                <div className="font-medium text-[13px]">Analyze with AI</div>
                <div className="text-[11px] text-sentinel-muted">Get structured defensive analysis</div>
              </button>
              <button onClick={handleCreateIncident} className="w-full text-left p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] transition-colors">
                <div className="font-medium text-[13px]">Create Incident</div>
                <div className="text-[11px] text-sentinel-muted">Escalate to incident response</div>
              </button>
              <Link to="/threat-intel" className="block p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] transition-colors">
                <div className="font-medium text-[13px]">Investigate IP</div>
                <div className="text-[11px] text-sentinel-muted">Check reputation of {alert.sourceIp}</div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
