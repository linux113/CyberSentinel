import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Brain, Send, AlertTriangle, Shield } from 'lucide-react';
import { getAlerts, getIncidents, getAssets, analyzeAlert } from '../services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  structured?: {
    assessment?: string;
    evidence?: string[];
    risk?: string;
    actions?: string[];
    confidence?: number;
  };
}

export function AIAnalyst() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'I am CyberSentinel AI Security Analyst — a defensive assistant. I analyze provided security evidence, explain suspicious activity, help prioritize incidents, and recommend defensive actions. I distinguish observed evidence vs inference and state uncertainty when needed.\n\nTry asking:',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "What are the most serious threats right now?",
    "Explain the latest critical alert.",
    "Which asset is most at risk?",
    "Summarize today's incidents.",
    "What should I investigate first?",
    "Show unresolved high-risk incidents.",
  ];

  const handleSend = async (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: q, timestamp: new Date().toISOString() };
    setMessages(prev=>[...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r=>setTimeout(r, 900));

    // Simulated AI logic using real mock data
    let response = '';
    let structured: ChatMessage['structured'] | undefined;

    const lower = q.toLowerCase();

    if (lower.includes('most serious') || lower.includes('critical') || lower.includes('serious threats')) {
      const alerts = await getAlerts({ severity: 'CRITICAL' });
      const top = alerts.slice(0,3);
      response = `Assessment: Found ${alerts.length} critical alerts. Most serious:\n\n` + top.map(a=>`• ${a.id}: ${a.title} (Risk ${a.riskScore}) — ${a.sourceIp} → ${a.destinationIp}`).join('\n');
      structured = {
        assessment: `${alerts.length} critical threats active`,
        evidence: top.map(a=>`${a.title} - Risk ${a.riskScore} - ${a.evidence.indicators.slice(0,2).join(', ')}`),
        risk: `Highest risk: ${top[0]?.riskScore || 0}/100 — CRITICAL`,
        actions: ['Investigate critical alerts first', 'Check affected assets WEB-SERVER-01, ADMIN-PORTAL', 'Review firewall blocks', 'Consider containment'],
        confidence: 87
      };
    } else if (lower.includes('latest') || lower.includes('explain')) {
      const alerts = await getAlerts();
      const latest = alerts[0];
      if (latest) {
        const analysis = await analyzeAlert(latest.id).catch(()=>null);
        response = `Latest alert ${latest.id}: ${latest.title}\n\nWhat Happened: ${latest.description}\nWhy Suspicious: ${latest.evidence.description}\n\n${analysis ? `AI Analysis: ${analysis.whatHappened}` : ''}`;
        structured = {
          assessment: latest.title,
          evidence: latest.evidence.indicators,
          risk: `${latest.riskScore}/100 — ${latest.severity}`,
          actions: latest.recommendation || ['Review logs', 'Verify authorization'],
          confidence: analysis?.confidence || 75
        };
      }
    } else if (lower.includes('most at risk') || lower.includes('asset')) {
      const assets = await getAssets();
      const riskiest = assets.sort((a,b)=>b.riskScore-a.riskScore)[0];
      response = `Most at risk asset: ${riskiest.name} (${riskiest.ip}) — Risk ${riskiest.riskScore}/100 — Status ${riskiest.status}\n\nReason: ${riskiest.vulnerabilities} open vulnerabilities, ${riskiest.activeAlerts} active alerts, open ports ${riskiest.openPorts.join(', ')}`;
      structured = {
        assessment: `${riskiest.name} is most at risk`,
        evidence: [`Risk ${riskiest.riskScore}`, `${riskiest.vulnerabilities} vulns`, `${riskiest.activeAlerts} alerts`, `Status ${riskiest.status}`],
        risk: `${riskiest.riskScore}/100 — ${riskiest.status}`,
        actions: ['Patch vulnerabilities', 'Review active alerts', 'Isolate if compromise suspected', 'Monitor traffic'],
        confidence: 82
      };
    } else if (lower.includes('summarize') || lower.includes('today')) {
      const incidents = await getIncidents();
      const today = incidents.slice(0,5);
      response = `Today's summary: ${incidents.length} total incidents, ${incidents.filter(i=>i.status!=='RESOLVED'&&i.status!=='CLOSED').length} active.\n\nRecent:\n` + today.map(i=>`• ${i.id}: ${i.title} — ${i.status}`).join('\n');
      structured = {
        assessment: `${today.length} recent incidents`,
        evidence: today.map(i=>`${i.id}: ${i.severity} risk ${i.riskScore}`),
        risk: `Active: ${incidents.filter(i=>i.status==='NEW').length} new, ${incidents.filter(i=>i.status==='INVESTIGATING').length} investigating`,
        actions: ['Prioritize critical/high', 'Review timeline', 'Update status', 'Generate report'],
        confidence: 78
      };
    } else if (lower.includes('investigate first') || lower.includes('prioritize')) {
      const alerts = await getAlerts();
      const sorted = alerts.filter(a=>a.status==='NEW').sort((a,b)=>b.riskScore-a.riskScore).slice(0,3);
      response = `What to investigate first (risk-based prioritization):\n\n` + sorted.map((a,i)=>`${i+1}. ${a.id}: ${a.title} — Risk ${a.riskScore} — ${a.destinationIp}`).join('\n') + '\n\nRecommended order: Critical → High → Medium, then by recency and asset criticality.';
      structured = {
        assessment: 'Prioritized investigation queue',
        evidence: sorted.map(a=>`${a.title} risk ${a.riskScore}`),
        risk: `Top risk ${sorted[0]?.riskScore || 0}/100`,
        actions: ['Start with critical asset ADMIN-PORTAL', 'Check for successful auth', 'Correlate with threat intel', 'Create incident if needed'],
        confidence: 85
      };
    } else if (lower.includes('unresolved') || lower.includes('high-risk')) {
      const incidents = await getIncidents();
      const unresolved = incidents.filter(i=>i.status!=='RESOLVED'&&i.status!=='CLOSED'&&i.riskScore>=60);
      response = `Unresolved high-risk incidents (${unresolved.length}):\n` + unresolved.map(i=>`• ${i.id}: ${i.title} — Risk ${i.riskScore} — ${i.status}`).join('\n');
      structured = {
        assessment: `${unresolved.length} high-risk unresolved`,
        evidence: unresolved.map(i=>`${i.id} risk ${i.riskScore} ${i.severity}`),
        risk: `Highest ${Math.max(...unresolved.map(i=>i.riskScore),0)}/100`,
        actions: ['Investigate', 'Contain if needed', 'Update timeline', 'Notify stakeholders'],
        confidence: 80
      };
    } else {
      response = `I analyzed your query: "${q}"\n\nBased on available telemetry:\n• I can explain alerts with observed evidence vs inference\n• I prioritize by risk score (0-29 LOW, 30-59 MEDIUM, 60-84 HIGH, 85-100 CRITICAL)\n• I recommend defensive actions without fabricating confirmation\n\nIf evidence insufficient, I state: "Insufficient evidence to determine this conclusively."\n\nTry one of the quick questions or ask about specific alert ID, IP, or asset.`;
      structured = {
        assessment: 'General guidance',
        evidence: ['No specific alert referenced', 'Using overall posture'],
        risk: 'Depends on context',
        actions: ['Specify alert ID or asset for detailed analysis', 'Use quick questions', 'Check Dashboard for posture'],
        confidence: 65
      };
    }

    const assistantMsg: ChatMessage = {
      id: (Date.now()+1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
      structured
    };
    setMessages(prev=>[...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          AI Security Analyst
        </h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Investigate security events using natural language — structured defensive assistant</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="w-4 h-4 text-violet-400" /> Analyst Workspace</CardTitle>
              <div className="text-[11px] text-sentinel-dim">Evidence-based • No fabrication • Defensive only</div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map(m=>(
                <div key={m.id} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 ${m.role==='user'?'bg-white text-black':'bg-white/[0.06] border border-white/[0.08] text-sentinel-text'}`}>
                    <div className="text-[13px] whitespace-pre-wrap leading-relaxed">{m.content}</div>
                    {m.structured && (
                      <div className="mt-4 space-y-3">
                        <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                          <div className="text-[11px] uppercase tracking-wide font-bold text-sky-300 mb-1">Assessment</div>
                          <div className="text-[12px]">{m.structured.assessment}</div>
                        </div>
                        {m.structured.evidence && (
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                            <div className="text-[11px] uppercase tracking-wide font-bold text-emerald-300 mb-1">Evidence</div>
                            <ul className="space-y-1">{m.structured.evidence.map((e,i)=><li key={i} className="text-[11px] flex gap-1.5"><span className="text-emerald-400">•</span>{e}</li>)}</ul>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                            <div className="text-[11px] uppercase tracking-wide font-bold text-orange-300 mb-1">Risk</div>
                            <div className="text-[12px] font-mono">{m.structured.risk}</div>
                          </div>
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                            <div className="text-[11px] uppercase tracking-wide font-bold text-violet-300 mb-1">Confidence</div>
                            <div className="text-[12px] font-mono">{m.structured.confidence}%</div>
                          </div>
                        </div>
                        {m.structured.actions && (
                          <div className="p-3 rounded-xl bg-black/30 border border-white/[0.06]">
                            <div className="text-[11px] uppercase tracking-wide font-bold text-sentinel-muted mb-1">Recommended Actions</div>
                            <ol className="space-y-1">{m.structured.actions.map((a,i)=><li key={i} className="text-[11px] flex gap-2"><span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px]">{i+1}</span>{a}</li>)}</ol>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="text-[10px] font-mono text-sentinel-dim mt-2">{new Date(m.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
              {loading && <div className="text-[12px] text-sentinel-muted animate-pulse">AI analyzing security evidence...</div>}
            </CardContent>
            <div className="p-4 border-t border-white/[0.06]">
              <div className="flex gap-2">
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} placeholder="Ask about threats, alerts, assets, incidents..." className="flex-1 h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] focus:outline-none focus:border-violet-500/30" />
                <button onClick={()=>handleSend()} disabled={loading} className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center hover:bg-white/90 disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card>
            <CardHeader><CardTitle>Example Questions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map(q=>(
                <button key={q} onClick={()=>handleSend(q)} className="w-full text-left p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors text-[12px] leading-snug">
                  "{q}"
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>AI Response Format</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-[12px]">
              <div className="flex gap-2"><Shield className="w-4 h-4 text-sky-400 shrink-0" /><div><span className="font-semibold">Assessment:</span> What happened</div></div>
              <div className="flex gap-2"><AlertTriangle className="w-4 h-4 text-emerald-400 shrink-0" /><div><span className="font-semibold">Evidence:</span> Observed indicators</div></div>
              <div className="flex gap-2"><Brain className="w-4 h-4 text-orange-400 shrink-0" /><div><span className="font-semibold">Risk:</span> 0-100 with severity</div></div>
              <div className="text-[11px] text-sentinel-dim italic">Clearly distinguishes observed evidence, inference, recommendation. Never claims confirmed attack without sufficient evidence.</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Safety Requirements</CardTitle></CardHeader>
            <CardContent className="text-[11px] leading-relaxed text-sentinel-muted space-y-2">
              <p>Defensive assistant only:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Analyzes provided evidence</li>
                <li>Explains suspicious activity</li>
                <li>Helps prioritize</li>
                <li>Recommends defensive actions</li>
                <li>States uncertainty</li>
                <li>Does NOT fabricate IP reputation, CVE, log evidence</li>
              </ul>
              <p className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200">If insufficient evidence: "Insufficient evidence to determine this conclusively."</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
