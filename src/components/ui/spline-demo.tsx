'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { Shield, Zap } from "lucide-react"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-white/[0.08]">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-white/50 font-semibold">CyberSentinel 3D Threat Visualization</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
              Interactive 3D<br/>Security Operations
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg leading-relaxed">
              Bring your SOC to life with beautiful 3D threat visualizations. Create immersive experiences 
              that capture attention and enhance security monitoring.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE 3D
              </div>
              <div className="text-[11px] text-white/40 font-mono">Suricata → Real-time → 3D</div>
            </div>
          </motion.div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}

export function CyberSentinelSplineHero() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-[#070a0f] border border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.08] via-transparent to-violet-500/[0.06]" />
      
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="relative z-10 flex h-full">
        <div className="flex-1 p-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[11px] font-medium tracking-wide text-sky-300">
              <Zap className="w-3 h-3" />
              AI-Powered Real-time 3D Visualization
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[0.9]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                Security Operations
              </span>
              <br/>
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                In 3D Space
              </span>
            </h2>
            
            <p className="text-[14px] leading-relaxed text-white/60 max-w-[400px]">
              Transform flat dashboards into immersive command centers. Monitor threats in spatial 3D, 
              investigate incidents with depth, respond with precision.
            </p>
            
            <div className="flex gap-3">
              <div className="px-4 py-2 rounded-xl bg-white text-black text-[12px] font-semibold">Explore 3D SOC</div>
              <div className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-[12px]">View Demo</div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full h-full"
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
          
          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-6 right-6 p-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/[0.08] space-y-2"
          >
            <div className="text-[10px] uppercase tracking-wide text-white/40">Live Threats</div>
            <div className="flex gap-3 text-[11px] font-mono">
              <span className="text-red-400">3 Critical</span>
              <span className="text-orange-400">8 High</span>
              <span className="text-white/60">24 Total</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
