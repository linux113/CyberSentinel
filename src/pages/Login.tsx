import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Zap, ArrowRight } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('analyst@cybersentinel.local');
  const [password, setPassword] = useState('demo123');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070a0f] flex">
      {/* Left */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] to-violet-500/[0.05]" />
        <div className="w-full max-w-[400px] relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-[18px] tracking-tight">CyberSentinel</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-white/50">Security Command Center</div>
            </div>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight leading-tight">SOC Analyst Login</h1>
          <p className="text-white/60 text-[14px] mt-2">Enter the security command center</p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wide font-semibold text-white/60">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] focus:outline-none focus:border-sky-500/30" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide font-semibold text-white/60">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] focus:outline-none focus:border-sky-500/30" />
            </div>

            <button onClick={()=>navigate('/dashboard')} className="w-full h-11 rounded-xl bg-white text-black font-semibold text-[14px] hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center"><span className="px-3 bg-[#070a0f] text-[11px] text-white/40 uppercase tracking-wide">Or</span></div>
            </div>

            <button onClick={()=>navigate('/dashboard')} className="w-full h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold text-[14px] hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Enter Demo — No Auth Required
            </button>

            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[12px] leading-relaxed">
              <div className="font-semibold text-sky-300">Demo Mode Active</div>
              <div className="text-sky-200/70 mt-1">For exhibition & college demo. Simulated telemetry. Future backend: Node.js + Express + MongoDB + Suricata + LLM analysis.</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-[12px] text-white/50 hover:text-white">← Back to landing</Link>
          </div>
        </div>
      </div>

      {/* Right - Preview */}
      <div className="hidden lg:flex flex-1 bg-[#0a0f17] border-l border-white/[0.06] p-8 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-sky-400/5" />
        <div className="w-full max-w-[480px] relative space-y-4">
          <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold">Live Preview — SOC Workflow</div>
          <div className="space-y-3">
            {[
              { step: '01', title: 'Live Threat Detected', desc: 'Port scanning from 203.0.113.45 → WEB-SERVER-01', color: 'border-red-500/30 bg-red-500/10' },
              { step: '02', title: 'Alert Generated', desc: 'ALR-10042 • Risk 87 • HIGH • Suricata', color: 'border-orange-500/30 bg-orange-500/10' },
              { step: '03', title: 'AI Analysis', desc: 'Observed evidence vs inference • Confidence 87%', color: 'border-sky-500/30 bg-sky-500/10' },
              { step: '04', title: 'Incident Created', desc: 'INC-0042 • Investigating • Assigned to Alex Rivera', color: 'border-violet-500/30 bg-violet-500/10' },
              { step: '05', title: 'Response & Report', desc: 'Block IP, enforce MFA, generate security report', color: 'border-emerald-500/30 bg-emerald-500/10' },
            ].map(s=>(
              <div key={s.step} className={`p-4 rounded-xl border ${s.color} flex gap-3`}>
                <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold">{s.step}</div>
                <div>
                  <div className="font-semibold text-[13px]">{s.title}</div>
                  <div className="text-[12px] text-white/60 mt-1">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-white/30 font-mono text-center pt-4">Monitor → Detect → Analyze → Prioritize → Investigate → Respond → Resolve → Report</div>
        </div>
      </div>
    </div>
  );
}
