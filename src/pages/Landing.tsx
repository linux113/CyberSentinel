import { Link } from 'react-router-dom';
import { Shield, Brain, Activity, AlertTriangle, Search, Server, FileText, Zap, ArrowRight, CheckCircle, Globe, Lock, Eye, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { SplineScene } from '@/components/ui/splite';
import BackgroundPixelStars from '@/components/ui/background-pixel-stars';
import { Card } from '@/components/ui/card';

export function Landing() {
  return (
    <div className="min-h-screen bg-[#070a0f] text-white relative overflow-hidden">
      {/* Pixel Stars Background - subtle */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <BackgroundPixelStars />
      </div>
      
      {/* Base gradient */}
      <div className="fixed inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAIElEQVR42mIUEhJiwAbevXuHVZyJgUQwqmEUDB0AEGAADd8DEPTX6ksAAAAASUVORK5CYII=')] bg-[size:10px] opacity-20 pointer-events-none" />
      
      {/* Nav */}
      <nav className="h-[64px] border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#070a0f]/80 backdrop-blur-xl sticky top-0 z-50 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight">CyberSentinel</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 tracking-widest uppercase">Command Center</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-white/90 transition-colors relative overflow-hidden group">
            <span className="relative z-10">Enter Command Center</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </motion.div>
      </nav>

      {/* Hero with Spline */}
      <section className="relative px-8 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-violet-500/[0.06] pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/10 to-sky-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto relative">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-medium tracking-wide text-sky-300 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            AI-Powered SOC Platform • Demo Environment Ready • Real Suricata Integration
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
                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Command Center
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[18px] leading-relaxed text-white/60 max-w-[600px]"
              >
                Detect threats. Understand risk. Respond intelligently. Transform security telemetry into prioritized, actionable intelligence with immersive 3D visualization.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <Link to="/dashboard" className="group px-6 py-3 rounded-xl bg-white text-black font-semibold text-[14px] flex items-center gap-2 hover:bg-white/90 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Explore Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white font-medium text-[14px] hover:bg-white/[0.1] transition-all hover:border-white/[0.15]">
                  View Demo
                </Link>
              </motion.div>

              {/* Workflow with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-[1px] rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02]"
              >
                <div className="rounded-2xl bg-[#0f1720]/80 backdrop-blur-xl p-6 relative overflow-hidden">
                  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                  <div className="text-[11px] tracking-[0.15em] uppercase text-white/40 font-semibold mb-4 relative z-10">SOC Workflow — Real-time Ready</div>
                  <div className="flex items-center gap-2 text-[13px] font-medium flex-wrap relative z-10">
                    {['Monitor','Detect','Analyze','Prioritize','Investigate','Respond','Resolve','Report'].map((s,i)=>(
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + i*0.05 }}
                        className="flex items-center gap-2"
                      >
                        <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-sky-500/20 transition-all cursor-default hover:scale-105">
                          {s}
                        </span>
                        {i<7 && <ArrowRight className="w-3 h-3 text-white/20" />}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right - Spline 3D */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[600px] rounded-2xl overflow-hidden bg-black/[0.4] border border-white/[0.06] backdrop-blur-xl"
            >
              <Card className="w-full h-full bg-black/[0.96] relative overflow-hidden border-0">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
                
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.05] via-transparent to-violet-500/[0.05] pointer-events-none" />
                
                {/* Spline 3D */}
                <div className="absolute inset-0">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/[0.08] text-[11px] font-mono text-white/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-2 animate-pulse" />
                      LIVE 3D • Suricata → Real-time
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-bold tracking-widest text-sky-300"
                    >
                      INTERACTIVE 3D
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/[0.08] max-w-[320px]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                          <Shield className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[12px] font-semibold">Threat Visualization</span>
                        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LIVE</span>
                      </div>
                      <div className="text-[11px] text-white/60 leading-relaxed">
                        Interactive 3D scenes bring SOC to life. Monitor threats in spatial depth, investigate with immersion.
                      </div>
                      <div className="mt-3 flex gap-2 text-[10px] font-mono">
                        <span className="text-red-400">3 Critical</span>
                        <span className="text-orange-400">8 High</span>
                        <span className="text-white/40">→ 3D View</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem/Solution with framer */}
      <section className="px-8 py-16 border-t border-white/[0.06] relative">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[13px] tracking-[0.15em] uppercase text-red-400 font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-red-400 rounded-full" />
              The Problem
            </h2>
            <p className="text-[20px] leading-snug font-medium">Security teams are overwhelmed by security data from network, firewalls, endpoints, auth systems, and threat intel.</p>
            <p className="text-white/60 mt-4 leading-relaxed">Alerts without context. No prioritization. No clear next action. Critical threats buried in noise.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-[13px] tracking-[0.15em] uppercase text-emerald-400 font-semibold mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-400 rounded-full" />
              The Solution
            </h2>
            <p className="text-[20px] leading-snug font-medium">CyberSentinel centralizes detection, analysis and response into one intelligent command center with 3D immersive experience.</p>
            <div className="mt-4 space-y-2">
              {['Unified security posture in seconds','AI-assisted threat analysis with evidence vs inference','Risk-based prioritization','Actionable defensive recommendations'].map((f,i)=>(
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i*0.1 }}
                  className="flex items-center gap-2 text-[14px] text-white/70 group hover:text-white transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />{f}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features with spotlight cards */}
      <section className="px-8 py-16 border-t border-white/[0.06] bg-[#0a0f17]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[24px] font-bold tracking-tight mb-8 flex items-center gap-3"
          >
            <div className="w-1 h-6 bg-gradient-to-b from-sky-400 to-blue-600 rounded-full" />
            Platform Capabilities
            <span className="text-[11px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono font-normal text-white/50">6 CORE MODULES</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Activity, title: 'Threat Detection', desc: 'Real-time monitoring of network, endpoints, and applications with Suricata-ready pipeline.', color: 'from-red-500/10 to-orange-500/10' },
              { icon: Brain, title: 'AI Analysis', desc: 'Structured defensive analysis: observed evidence, inference, risk assessment, and recommendations.', color: 'from-violet-500/10 to-purple-500/10' },
              { icon: AlertTriangle, title: 'Risk Scoring', desc: 'Consistent 0-100 risk model: LOW 0-29, MEDIUM 30-59, HIGH 60-84, CRITICAL 85-100.', color: 'from-amber-500/10 to-yellow-500/10' },
              { icon: Search, title: 'Threat Intelligence', desc: 'Investigate IPs, domains, hashes, URLs with reputation, related activity, and sources.', color: 'from-sky-500/10 to-blue-500/10' },
              { icon: Server, title: 'Asset & Vuln Management', desc: 'Inventory, risk scoring, vulnerability tracking with CVSS, remediation guidance.', color: 'from-emerald-500/10 to-teal-500/10' },
              { icon: FileText, title: 'Incident Response & Reporting', desc: 'Full lifecycle: NEW → INVESTIGATING → CONTAINED → RESOLVED → CLOSED with reports.', color: 'from-zinc-500/10 to-neutral-500/10' },
            ].map((f,i)=>(
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i*0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group p-[1px] rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] transition-all"
              >
                <div className="p-5 rounded-xl bg-[#0f1720]/80 backdrop-blur-xl border border-white/[0.02] relative overflow-hidden h-full">
                  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" size={150} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] group-hover:scale-110 transition-all">
                      <f.icon className="w-5 h-5 text-sky-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="font-semibold text-[14px] group-hover:text-white transition-colors">{f.title}</div>
                    <div className="text-[13px] text-white/60 mt-2 leading-relaxed group-hover:text-white/80 transition-colors">{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real vs Demo with 3D */}
      <section className="px-8 py-16 border-t border-white/[0.06] relative">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold">Real Suricata Integration</div>
                <div className="text-[11px] text-white/50 font-mono">Kali → Suricata → EVE JSON → Backend → 3D Dashboard</div>
              </div>
            </div>
            
            <h3 className="text-[28px] font-bold tracking-tight leading-tight">
              From Simulation to<br/>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Real Detection</span>
            </h3>
            
            <p className="text-white/60 leading-relaxed">
              Demo mode uses simulated telemetry clearly labeled SIMULATION. Real mode tails Suricata EVE JSON, parses alerts, stores in MongoDB, pushes via Socket.IO — no SIM badge, real evidence, real AI analysis.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Eye, label: 'Real-time Tail', desc: 'eve.json watcher' },
                { icon: Lock, label: 'MongoDB Store', desc: 'with eveRaw forensics' },
                { icon: Cpu, label: 'Socket.IO Live', desc: 'new-alert events' },
                { icon: Brain, label: 'LLM Analysis', desc: 'evidence-based' },
              ].map(item=>(
                <div key={item.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex gap-2">
                  <item.icon className="w-4 h-4 text-sky-400 mt-0.5" />
                  <div>
                    <div className="text-[12px] font-semibold">{item.label}</div>
                    <div className="text-[11px] text-white/50">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="w-full h-[400px] bg-black/[0.96] relative overflow-hidden">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
              <div className="flex h-full">
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    Interactive 3D SOC
                  </h1>
                  <p className="mt-4 text-neutral-300 max-w-lg text-[13px] leading-relaxed">
                    Bring your security operations to life with beautiful 3D threat visualizations. 
                    Monitor, detect, analyze in immersive space.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">REAL MODE</span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">3D READY</span>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <SplineScene 
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Demo CTA with pixel stars */}
      <section className="px-8 py-20 border-t border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-500/[0.05] to-transparent pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] font-bold tracking-tight"
          >
            Ready to enter the SOC?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 mt-3"
          >
            Experience the full workflow: Live Threat → Alert → Evidence → Risk Score → AI Analysis → Incident → Response → Report<br/>
            <span className="text-sky-300">Now with 3D immersive visualization and real Suricata integration</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-3 mt-8"
          >
            <Link to="/dashboard" className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Enter Security Command Center <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="mt-4 text-[11px] text-white/40 font-mono">DEMO ENVIRONMENT • No real auth required • Simulated + Real Suricata • 3D Ready</div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-8 py-6 flex items-center justify-between text-[11px] text-white/40 relative">
        <span>© 2026 CyberSentinel • AI-Powered Cybersecurity Command Center • Built for Arena AI • 3D + Real-time + AI</span>
        <span className="font-mono hidden md:block">Future: Node.js + Express • MongoDB • Suricata • LLM Analysis • Spline 3D • Framer Motion</span>
      </footer>
    </div>
  );
}
