'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// 21.dev inspired - Animated Gradient Background (replaces pixel stars)
export function AnimatedGradientBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[#070a0f]" />
      <motion.div
        animate={{
          background: [
            "radial-gradient(600px 600px at 20% -10%, rgba(14,165,233,0.15), transparent)",
            "radial-gradient(600px 600px at 80% 0%, rgba(139,92,246,0.15), transparent)",
            "radial-gradient(600px 600px at 50% 100%, rgba(14,165,233,0.1), transparent)",
            "radial-gradient(600px 600px at 20% -10%, rgba(14,165,233,0.15), transparent)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      <motion.div
        animate={{
          background: [
            "radial-gradient(800px 400px at 80% 20%, rgba(239,68,68,0.08), transparent)",
            "radial-gradient(800px 400px at 20% 80%, rgba(239,68,68,0.06), transparent)",
            "radial-gradient(800px 400px at 80% 20%, rgba(239,68,68,0.08), transparent)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
    </div>
  );
}

// Grid Background - 21.dev trending
export function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[#070a0f]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070a0f]" />
    </div>
  );
}

// Dot Background - 21.dev style
export function DotBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[#070a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a0f]/0 via-[#070a0f]/50 to-[#070a0f]" />
    </div>
  );
}

// Cyber Grid - Unique for CyberSentinel
export function CyberGridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[#070a0f]" />
      {/* Animated grid lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(14,165,233,0.03)_50%,transparent_100%)] animate-[shimmer_3s_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e908_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e908_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      {/* Radial gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-violet-500/5 rounded-full blur-[100px]" />
      {/* Scanline effect */}
      <motion.div
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent"
      />
    </div>
  );
}

// Spotlight Background - 21.dev style with multiple spotlights
export function SpotlightBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[#070a0f]" />
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[60px]"
        />
      </div>
    </div>
  );
}
