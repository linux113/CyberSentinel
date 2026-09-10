import { Link } from 'react-router-dom';
import { Shield, Brain, Activity, AlertTriangle, Search, Server, FileText, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-white">
      {/* Nav */}
      <nav className="h-[64px] border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#070a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight">CyberSentinel</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 tracking-widest uppercase">Command Center</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors">Enter Command Center</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-8 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-violet-500/[0.06] pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/10 to-sky-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-medium tracking-wide text-sky-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-subtle" />
            AI-Powered SOC Platform • Demo Environment Ready
          </div>
          <h1 className="text-[56px] font-bold tracking-[-0.03em] leading-[0.95] max-w-[800px]">
            AI-Powered Cybersecurity <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Command Center</span>
          </h1>
          <p className="text-[18px] leading-relaxed text-white/60 max-w-[600px] mt-6">
            Detect threats. Understand risk. Respond intelligently. Transform security telemetry into prioritized, actionable intelligence.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-[14px] flex items-center gap-2 hover:bg-white/90 transition-colors">
              Explore Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-medium text-[14px] hover:bg-white/[0.1] transition-colors">
              View Demo
            </Link>
          </div>

          {/* Workflow */}
          <div className="mt-16 p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div className="rounded-2xl bg-[#0f1720]/80 backdrop-blur-xl p-6">
              <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4">SOC Workflow</div>
              <div className="flex items-center gap-2 text-[13px] font-medium flex-wrap">
                {['Monitor','Detect','Analyze','Prioritize','Investigate','Respond','Resolve','Report'].map((s,i)=>(
                  <div key={s} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08]">{s}</span>
                    {i<7 && <ArrowRight className="w-3 h-3 text-white/20" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="px-8 py-16 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-[13px] tracking-[0.15em] uppercase text-red-400 font-semibold mb-4">The Problem</h2>
            <p className="text-[20px] leading-snug font-medium">Security teams are overwhelmed by security data from network, firewalls, endpoints, auth systems, and threat intel.</p>
            <p className="text-white/60 mt-4 leading-relaxed">Alerts without context. No prioritization. No clear next action. Critical threats buried in noise.</p>
          </div>
          <div>
            <h2 className="text-[13px] tracking-[0.15em] uppercase text-emerald-400 font-semibold mb-4">The Solution</h2>
            <p className="text-[20px] leading-snug font-medium">CyberSentinel centralizes detection, analysis, and response into one intelligent command center.</p>
            <div className="mt-4 space-y-2">
              {['Unified security posture in seconds','AI-assisted threat analysis with evidence vs inference','Risk-based prioritization','Actionable defensive recommendations'].map(f=>(
                <div key={f} className="flex items-center gap-2 text-[14px] text-white/70"><CheckCircle className="w-4 h-4 text-emerald-400" />{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 border-t border-white/[0.06] bg-[#0a0f17]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[24px] font-bold tracking-tight mb-8">Platform Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Activity, title: 'Threat Detection', desc: 'Real-time monitoring of network, endpoints, and applications with Suricata-ready pipeline.' },
              { icon: Brain, title: 'AI Analysis', desc: 'Structured defensive analysis: observed evidence, inference, risk assessment, and recommendations.' },
              { icon: AlertTriangle, title: 'Risk Scoring', desc: 'Consistent 0-100 risk model: LOW 0-29, MEDIUM 30-59, HIGH 60-84, CRITICAL 85-100.' },
              { icon: Search, title: 'Threat Intelligence', desc: 'Investigate IPs, domains, hashes, URLs with reputation, related activity, and sources.' },
              { icon: Server, title: 'Asset & Vuln Management', desc: 'Inventory, risk scoring, vulnerability tracking with CVSS, remediation guidance.' },
              { icon: FileText, title: 'Incident Response & Reporting', desc: 'Full lifecycle: NEW → INVESTIGATING → CONTAINED → RESOLVED → CLOSED with reports.' },
            ].map(f=>(
              <div key={f.title} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-sky-400" />
                </div>
                <div className="font-semibold text-[14px]">{f.title}</div>
                <div className="text-[13px] text-white/60 mt-2 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="px-8 py-20 border-t border-white/[0.06]">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-[32px] font-bold tracking-tight">Ready to enter the SOC?</h2>
          <p className="text-white/60 mt-3">Experience the full workflow: Live Threat → Alert → Evidence → Risk Score → AI Analysis → Incident → Response → Report</p>
          <Link to="/dashboard" className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors">
            Enter Security Command Center <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-4 text-[11px] text-white/40 font-mono">DEMO ENVIRONMENT • No real auth required • Simulated telemetry</div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-8 py-6 flex items-center justify-between text-[11px] text-white/40">
        <span>© 2026 CyberSentinel • AI-Powered Cybersecurity Command Center • Built for Arena AI</span>
        <span className="font-mono">Future: Node.js + Express • MongoDB • Suricata • LLM Analysis</span>
      </footer>
    </div>
  );
}
