import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientButton, ShimmerButton, SpinningBorderButton, RainbowBorderButton } from '@/components/ui/21-button';
import { PremiumCard, GlassCard } from '@/components/ui/21-card';
import { AnimatedGradientBackground, GridBackground } from '@/components/ui/21-background';
import { Spotlight } from '@/components/ui/spotlight';

export function Login() {
  const [email, setEmail] = useState('analyst@cybersentinel.local');
  const [password, setPassword] = useState('demo123');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070a0f] flex relative overflow-hidden">
      <AnimatedGradientBackground />
      <GridBackground className="opacity-20" />
      
      {/* Left */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px] relative"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-[18px] tracking-tight flex items-center gap-2">
                CyberSentinel
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">21.DEV</span>
              </div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-white/50">Security Command Center</div>
            </div>
          </div>

          <h1 className="text-[28px] font-bold tracking-tight leading-tight">SOC Analyst Login</h1>
          <p className="text-white/60 text-[14px] mt-2 flex items-center gap-2">
            Enter the security command center
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono">21.dev Premium</span>
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wide font-semibold text-white/60 flex items-center gap-2">
                Email
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              </label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.08] backdrop-blur-xl transition-all" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wide font-semibold text-white/60">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full h-11 px-4 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.08] backdrop-blur-xl transition-all" />
            </div>

            <GradientButton onClick={()=>navigate('/dashboard')} className="w-full">
              Sign In <ArrowRight className="w-4 h-4" />
            </GradientButton>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center"><span className="px-3 bg-[#070a0f] text-[11px] text-white/40 uppercase tracking-wide">Or</span></div>
            </div>

            <RainbowBorderButton onClick={()=>navigate('/dashboard')} className="w-full">
              <Zap className="w-4 h-4" /> Enter Demo — No Auth Required
            </RainbowBorderButton>

            <PremiumCard gradient="sky" className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div className="font-semibold text-sky-300 text-[13px]">Demo Mode Active • 21.dev Premium</div>
              </div>
              <div className="text-sky-200/70 text-[11px] leading-relaxed">For exhibition & college demo. Simulated telemetry with 21.dev premium UI. Future backend: Node.js + Express + MongoDB + Suricata + LLM analysis + Spline 3D.</div>
              <div className="mt-3 flex gap-2">
                <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08]">SOC Workflow</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">Live</span>
                <span className="text-[10px] px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">21.dev</span>
              </div>
            </PremiumCard>
          </div>

          <div className="mt-8 text-center flex justify-center gap-3">
            <Link to="/">
              <ShimmerButton variant="ghost" className="text-[12px]">← Back to landing</ShimmerButton>
            </Link>
            <SpinningBorderButton>21.dev UI</SpinningBorderButton>
          </div>
        </motion.div>
      </div>

      {/* Right - Preview with 21.dev cards */}
      <div className="hidden lg:flex flex-1 bg-[#0a0f17]/50 border-l border-white/[0.06] p-8 items-center justify-center relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-500/5 to-sky-400/10" />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="w-full max-w-[480px] relative space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold">Live Preview — SOC Workflow • 21.dev</div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">PREMIUM</span>
          </div>
          
          <div className="space-y-3">
            {[
              { step: '01', title: 'Live Threat Detected', desc: 'Port scanning from 203.0.113.45 → WEB-SERVER-01', color: 'red' as const, status: 'critical' as const },
              { step: '02', title: 'Alert Generated', desc: 'ALR-10042 • Risk 87 • HIGH • Suricata', color: 'amber' as const, status: 'high' as const },
              { step: '03', title: 'AI Analysis', desc: 'Observed evidence vs inference • Confidence 87%', color: 'sky' as const, status: 'default' as const },
              { step: '04', title: 'Incident Created', desc: 'INC-0042 • Investigating • Assigned to Alex Rivera', color: 'violet' as const, status: 'default' as const },
              { step: '05', title: 'Response & Report', desc: 'Block IP, enforce MFA, generate security report', color: 'emerald' as const, status: 'healthy' as const },
            ].map(s=>(
              <GlassCard key={s.step} className={`p-4 flex gap-3 border-l-2 ${s.color === 'red' ? 'border-l-red-500/50' : s.color === 'amber' ? 'border-l-amber-500/50' : s.color === 'sky' ? 'border-l-sky-500/50' : s.color === 'violet' ? 'border-l-violet-500/50' : 'border-l-emerald-500/50'}`}>
                <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold backdrop-blur-xl">{s.step}</div>
                <div className="flex-1">
                  <div className="font-semibold text-[13px] flex items-center gap-2">
                    {s.title}
                    <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'critical' ? 'bg-red-500 animate-pulse' : s.status === 'high' ? 'bg-orange-500' : s.status === 'healthy' ? 'bg-emerald-500' : 'bg-sky-400'}`} />
                  </div>
                  <div className="text-[12px] text-white/60 mt-1">{s.desc}</div>
                </div>
              </GlassCard>
            ))}
          </div>
          
          <PremiumCard gradient="default" className="p-3 text-center">
            <div className="text-[11px] text-white/30 font-mono">Monitor → Detect → Analyze → Prioritize → Investigate → Respond → Resolve → Report</div>
            <div className="mt-2 flex justify-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">21.dev Premium UI</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300">Real + Demo</span>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}
