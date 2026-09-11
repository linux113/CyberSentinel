import { Link } from 'react-router-dom';
import { Shield, Brain, Activity, AlertTriangle, Search, Server, FileText, Zap, ArrowRight, CheckCircle, Globe, Lock, Eye, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { RainbowBorderButton, SpinningBorderButton, ShimmerButton, GradientButton, MagneticButton, StatusButton, CyberButton } from '@/components/ui/21-button';
import { PremiumCard, SOCCard, GlassCard, MetricCard } from '@/components/ui/21-card';
import { AnimatedGradientBackground, GridBackground, CyberGridBackground, SpotlightBackground } from '@/components/ui/21-background';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-white relative overflow-hidden">
      {/*  Animated Gradient Background - replaces pixel stars */}
      <AnimatedGradientBackground />
      <CyberGridBackground className="opacity-60" />
      
      {/* Nav -  style with glass and status */}
      <nav className="h-[68px] border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#070a0f]/70 backdrop-blur-2xl sticky top-0 z-50 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold tracking-tight flex items-center gap-2">
              CyberSentinel
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 tracking-widest uppercase">Command Center</span>
            </div>
            <div className="text-[10px] text-white/40 font-mono">AI-Powered SOC Real-time 3D</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <StatusButton status="online">System Operational</StatusButton>
          <Link to="/login">
            <MagneticButton>Enter Command Center</MagneticButton>
          </Link>
        </motion.div>
      </nav>

      {/* Hero with Spline +  buttons */}
      <section className="relative px-8 py-12 overflow-hidden">
        <SpotlightBackground />
        
        <div className="max-w-[1300px] mx-auto relative">
          {/* Top badge -  style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-medium tracking-wide text-sky-300">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              AI-Powered SOC Platform Real Suricata Integration 
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-white/30">
              <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">MONITOR → DETECT → ANALYZE → RESPOND</span>
            </div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[48px] md:text-[64px] font-bold tracking-[-0.03em] leading-[0.9]"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                  AI-Powered Cybersecurity
                </span>
                <br/>
                <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Command Center
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[18px] leading-relaxed text-white/60 max-w-[600px]"
              >
                Detect threats. Understand risk. Respond intelligently. Transform security telemetry into prioritized, actionable intelligence with premium components and immersive 3D visualization.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/dashboard">
                  <GradientButton size="lg">
                    Explore Platform <ArrowRight className="w-4 h-4" />
                  </GradientButton>
                </Link>
                <Link to="/login">
                  <ShimmerButton variant="secondary">
                    <Eye className="w-4 h-4" /> View Demo
                  </ShimmerButton>
                </Link>
                <SpinningBorderButton>
                  <Sparkles className="w-4 h-4" /> Premium UI
                </SpinningBorderButton>
              </motion.div>

              {/* Workflow with cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <PremiumCard gradient="sky" className="p-6">
                  <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4 flex items-center gap-2">
                    <div className="w-1 h-3 bg-sky-400 rounded-full" />
                    SOC Workflow — Real-time Ready
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-medium flex-wrap">
                    {['Monitor','Detect','Analyze','Prioritize','Investigate','Respond','Resolve','Report'].map((s,i)=>(
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + i*0.05 }}
                        className="flex items-center gap-2"
                      >
                        <div className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-sky-500/20 transition-all cursor-default hover:scale-105 backdrop-blur-xl">
                          {s}
                        </div>
                        {i<7 && <ArrowRight className="w-3 h-3 text-white/20" />}
                      </motion.div>
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>

              {/* Metrics -  MetricCard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-3 gap-3"
              >
                <MetricCard label="Assets" value="24" change="Monitored" status="healthy" />
                <MetricCard label="Threats" value="47" change="Active now" status="high" />
                <MetricCard label="Score" value="82/100" change="+6% Good" status="healthy" />
              </motion.div>
            </div>

            {/* Right - Spline 3D with Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[650px]"
            >
              <PremiumCard className="w-full h-full p-0 overflow-hidden" gradient="sky">
                <div className="absolute inset-0 bg-black/[0.4]" />
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                
                {/* Spline 3D */}
                <div className="absolute inset-0">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Overlay content -  style */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start pointer-events-auto">
                    <StatusButton status="online">LIVE 3D Suricata → Real-time</StatusButton>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-bold tracking-widest text-sky-300 backdrop-blur-xl">INTERACTIVE 3D</span>
                      
                    </div>
                  </div>
                  
                  <div className="space-y-3 pointer-events-auto">
                    <GlassCard className="p-4 max-w-[340px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[13px] font-semibold">Threat Visualization</span>
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LIVE</span>
                      </div>
                      <div className="text-[11px] text-white/60 leading-relaxed">
                        Interactive 3D scenes bring SOC to life. Monitor threats in spatial depth, investigate with immersion — premium components.
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex gap-2 text-[10px] font-mono">
                          <span className="px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400">3 Critical</span>
                          <span className="px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">8 High</span>
                        </div>
                        <div className="ml-auto">
                          <CyberButton variant="primary">View 3D →</CyberButton>
                        </div>
                      </div>
                    </GlassCard>
                    
                    <div className="flex gap-2">
                      <RainbowBorderButton variant="small">Explore 3D SOC</RainbowBorderButton>
                      <ShimmerButton variant="secondary" className="text-[11px] px-3 py-1.5">Docs →</ShimmerButton>
                    </div>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution with cards */}
      <section className="px-8 py-16 border-t border-white/[0.06] relative">
        <GridBackground className="opacity-30" />
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SOCCard status="critical" title="The Problem" subtitle="Security Operations Challenge">
              <p className="text-[18px] leading-snug font-medium">Security teams are overwhelmed by security data from network, firewalls, endpoints, auth systems, and threat intel.</p>
              <p className="text-white/60 mt-4 leading-relaxed text-[14px]">Alerts without context. No prioritization. No clear next action. Critical threats buried in noise.</p>
              <div className="mt-4 flex gap-2">
                <CyberButton variant="danger">Critical Issue</CyberButton>
                <StatusButton status="critical">Overwhelmed</StatusButton>
              </div>
            </SOCCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SOCCard status="healthy" title="The Solution" subtitle=" SOC Platform">
              <p className="text-[18px] leading-snug font-medium">CyberSentinel centralizes detection, analysis and response into one intelligent command center with premium UI and 3D immersive experience.</p>
              <div className="mt-4 space-y-2">
                {['Unified security posture in seconds','AI-assisted threat analysis with evidence vs inference','Risk-based prioritization','Actionable defensive recommendations'].map((f,i)=>(
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i*0.1 }}
                    className="flex items-center gap-2 text-[13px] text-white/70 group hover:text-white transition-colors p-2 rounded-lg hover:bg-white/[0.04] border border-transparent hover:border-white/[0.06]"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />{f}
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <CyberButton variant="success"> UI</CyberButton>
                <StatusButton status="online">Resolved</StatusButton>
              </div>
            </SOCCard>
          </motion.div>
        </div>
      </section>

      {/* Features with Cards */}
      <section className="px-8 py-16 border-t border-white/[0.06] bg-[#0a0f17]/50 relative overflow-hidden">
        <SpotlightBackground className="opacity-50" />
        <div className="max-w-[1200px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full" />
              Platform Capabilities
              <span className="text-[11px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono font-normal text-white/50">6 CORE MODULES </span>
            </h2>
            <div className="hidden md:flex gap-2">
              <RainbowBorderButton variant="small">Premium UI</RainbowBorderButton>
              <StatusButton status="online">All Systems Operational</StatusButton>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Activity, title: 'Threat Detection', desc: 'Real-time monitoring with Suricata-ready pipeline.', gradient: 'red' as const, status: 'critical' as const },
              { icon: Brain, title: 'AI Analysis', desc: 'Structured defensive analysis: evidence, inference, risk, recommendations.', gradient: 'violet' as const, status: 'default' as const },
              { icon: AlertTriangle, title: 'Risk Scoring', desc: '0-100 risk model: LOW 0-29, MEDIUM 30-59, HIGH 60-84, CRITICAL 85-100.', gradient: 'amber' as const, status: 'high' as const },
              { icon: Search, title: 'Threat Intelligence', desc: 'Investigate IPs, domains, hashes, URLs with reputation and sources.', gradient: 'sky' as const, status: 'default' as const },
              { icon: Server, title: 'Asset & Vuln Management', desc: 'Inventory, risk scoring, vulnerability tracking with CVSS.', gradient: 'emerald' as const, status: 'healthy' as const },
              { icon: FileText, title: 'Incident Response & Reporting', desc: 'Full lifecycle: NEW → INVESTIGATING → CONTAINED → RESOLVED → CLOSED.', gradient: 'default' as const, status: 'default' as const },
            ].map((f,i)=>(
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i*0.05 }}
              >
                <PremiumCard gradient={f.gradient} className="h-full p-5 group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.1] group-hover:border-white/[0.15] group-hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                      <f.icon className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                    </div>
                    <StatusButton status={f.status === 'critical' ? 'critical' : f.status === 'high' ? 'warning' : f.status === 'healthy' ? 'online' : 'offline'}>
                      {f.status.toUpperCase()}
                    </StatusButton>
                  </div>
                  <div className="font-semibold text-[14px] group-hover:text-white transition-colors">{f.title}</div>
                  <div className="text-[13px] text-white/60 mt-2 leading-relaxed group-hover:text-white/80 transition-colors">{f.desc}</div>
                  <div className="mt-4 flex gap-2">
                    <CyberButton variant="secondary" className="text-[11px] px-3 py-1">Learn →</CyberButton>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real vs Demo with Spline */}
      <section className="px-8 py-16 border-t border-white/[0.06] relative">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  Real Suricata Integration
                  
                </div>
                <div className="text-[11px] text-white/50 font-mono">Kali → Suricata → EVE JSON → Backend → 3D Dashboard</div>
              </div>
            </div>
            
            <h3 className="text-[28px] font-bold tracking-tight leading-tight">
              From Simulation to<br/>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 bg-clip-text text-transparent">Real Detection</span>
            </h3>
            
            <p className="text-white/60 leading-relaxed">
              Demo mode uses simulated telemetry clearly labeled SIMULATION. Real mode tails Suricata EVE JSON, parses alerts, stores in MongoDB, pushes via Socket.IO — no SIM badge, real evidence, real AI analysis — all with premium UI.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Eye, label: 'Real-time Tail', desc: 'eve.json watcher', color: 'sky' },
                { icon: Lock, label: 'MongoDB Store', desc: 'with eveRaw forensics', color: 'emerald' },
                { icon: Cpu, label: 'Socket.IO Live', desc: 'new-alert events', color: 'violet' },
                { icon: Brain, label: 'LLM Analysis', desc: 'evidence-based', color: 'amber' },
              ].map(item=>(
                <GlassCard key={item.label} className="p-3 flex gap-3 hover:scale-[1.02] transition-transform">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold">{item.label}</div>
                    <div className="text-[11px] text-white/50">{item.desc}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="flex gap-3">
              <GradientButton>
                <Zap className="w-4 h-4" /> Show Real Demo
              </GradientButton>
              <ShimmerButton variant="secondary">
                Documentation →
              </ShimmerButton>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <PremiumCard gradient="sky" className="h-[450px] p-0 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-300 mb-4">
                    <Sparkles className="w-3 h-3" /> 
                  </div>
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                    Interactive 3D SOC<br/>Command Center
                  </h1>
                  <p className="mt-4 text-neutral-300 max-w-lg text-[13px] leading-relaxed">
                    Bring your security operations to life with beautiful 3D threat visualizations. 
                    Monitor, detect, analyze in immersive space — style.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="text-[10px] px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-xl">REAL MODE</span>
                    <span className="text-[10px] px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 backdrop-blur-xl">3D READY</span>
                    
                  </div>
                  <div className="mt-6">
                    <RainbowBorderButton variant="small">Launch 3D View →</RainbowBorderButton>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </section>

      {/* Demo CTA -  style with gradient background */}
      <section className="px-8 py-20 border-t border-white/[0.06] relative overflow-hidden">
        <AnimatedGradientBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-500/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            <Zap className="w-7 h-7 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[36px] font-bold tracking-tight"
          >
            Ready to enter the SOC?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-4 leading-relaxed"
          >
            Experience the full workflow: Live Threat → Alert → Evidence → Risk Score → AI Analysis → Incident → Response → Report<br/>
            <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-violet-300 bg-clip-text text-transparent font-medium">Now with premium UI, 3D immersive visualization and real Suricata integration</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <Link to="/dashboard">
              <GradientButton size="lg" className="shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                Enter Security Command Center <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </Link>
            <Link to="/login">
              <ShimmerButton variant="secondary" className="px-8 py-4">
                View Demo
              </ShimmerButton>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-3 flex-wrap"
          >
            <StatusButton status="online">Demo Ready</StatusButton>
            <StatusButton status="online">Real Suricata</StatusButton>
            <StatusButton status="online">Premium UI</StatusButton>
            <StatusButton status="online">3D + AI</StatusButton>
          </motion.div>
          <div className="mt-4 text-[11px] text-white/30 font-mono">DEMO ENVIRONMENT • No real auth required Simulated + Real Suricata </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-8 py-6 flex items-center justify-between text-[11px] text-white/40 relative backdrop-blur-xl bg-[#070a0f]/50">
        <span>© 2026 CyberSentinel AI-Powered Cybersecurity Command Center Built for Arena AI • Premium SOC </span>
        <span className="font-mono hidden md:flex items-center gap-2">
          <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Node.js + Express</span>
          <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">MongoDB</span>
          <span className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">Suricata</span>
          
        </span>
      </footer>
    </div>
  );
}
