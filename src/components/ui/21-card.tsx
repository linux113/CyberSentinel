'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Spotlight } from './spotlight';

//  inspired - Premium Card with gradient border and hover effects
export function PremiumCard({ 
  children, 
  className,
  hoverEffect = true,
  spotlight = true,
  gradient = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  hoverEffect?: boolean;
  spotlight?: boolean;
  gradient?: 'default' | 'sky' | 'violet' | 'emerald' | 'red' | 'amber';
}) {
  const gradients = {
    default: "from-white/[0.08] to-white/[0.02]",
    sky: "from-sky-500/20 to-blue-500/5",
    violet: "from-violet-500/20 to-purple-500/5",
    emerald: "from-emerald-500/20 to-teal-500/5",
    red: "from-red-500/20 to-orange-500/5",
    amber: "from-amber-500/20 to-yellow-500/5"
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "group relative p-[1px] rounded-2xl transition-all",
        `bg-gradient-to-br ${gradients[gradient]} hover:from-white/[0.12] hover:to-white/[0.04]`,
        className
      )}
    >
      <div className="relative rounded-2xl bg-[#0f1720]/90 backdrop-blur-xl border border-white/[0.02] overflow-hidden h-full">
        {spotlight && <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={200} />}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// SOC Card - Specific for CyberSentinel with status indicator
export function SOCCard({ 
  children, 
  className,
  status = 'default',
  title,
  subtitle
}: { 
  children: React.ReactNode; 
  className?: string;
  status?: 'default' | 'critical' | 'high' | 'medium' | 'healthy';
  title?: string;
  subtitle?: string;
}) {
  const statusStyles = {
    default: "border-white/[0.06] from-white/[0.06] to-white/[0.02]",
    critical: "border-red-500/20 from-red-500/10 to-red-600/5 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    high: "border-orange-500/20 from-orange-500/10 to-orange-600/5",
    medium: "border-yellow-500/20 from-yellow-500/10 to-yellow-600/5",
    healthy: "border-emerald-500/20 from-emerald-500/10 to-emerald-600/5"
  };

  const statusDot = {
    default: "bg-white/50",
    critical: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse",
    high: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]",
    medium: "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]",
    healthy: "bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
  };

  return (
    <div className={cn(
      "relative p-[1px] rounded-xl bg-gradient-to-br backdrop-blur-xl group hover:scale-[1.01] transition-all duration-300",
      statusStyles[status],
      className
    )}>
      <div className="rounded-xl bg-[#0f1720]/90 backdrop-blur-xl border border-white/[0.02] p-5 h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {(title || subtitle) && (
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              {title && <h3 className="font-semibold text-[13px] tracking-wide uppercase text-white">{title}</h3>}
              {subtitle && <p className="text-[11px] text-white/50 mt-1">{subtitle}</p>}
            </div>
            <div className={cn("w-2 h-2 rounded-full mt-1", statusDot[status])} />
          </div>
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

// Glass Card with animated border -  trending
export function GlassCard({ 
  children, 
  className,
  animated = true
}: { 
  children: React.ReactNode; 
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn(
      "relative rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.06] overflow-hidden group",
      "hover:bg-white/[0.05] hover:border-white/[0.10] transition-all duration-500",
      className
    )}>
      {animated && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.03] via-transparent to-violet-500/[0.03]" />
          </div>
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Metric Card - For dashboard numbers with style
export function MetricCard({ 
  label, 
  value, 
  change, 
  icon: Icon,
  status = 'default',
  className
}: { 
  label: string;
  value: string | number;
  change?: string;
  icon?: any;
  status?: 'critical' | 'high' | 'medium' | 'low' | 'healthy' | 'default';
  className?: string;
}) {
  const statusConfig = {
    critical: { color: "text-red-400", bg: "from-red-500/10 to-red-600/5", border: "border-red-500/20", glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]" },
    high: { color: "text-orange-400", bg: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/20", glow: "" },
    medium: { color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-600/5", border: "border-yellow-500/20", glow: "" },
    low: { color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/20", glow: "" },
    healthy: { color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/20", glow: "" },
    default: { color: "text-white", bg: "from-white/[0.06] to-white/[0.02]", border: "border-white/[0.06]", glow: "" }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative p-[1px] rounded-xl bg-gradient-to-br group cursor-pointer",
        config.bg,
        config.border,
        config.glow,
        className
      )}
    >
      <div className="rounded-xl bg-[#0f1720]/90 backdrop-blur-xl p-4 h-full relative overflow-hidden">
        <Spotlight size={120} className="-top-20 left-0" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="text-[11px] uppercase tracking-wide text-white/50 font-semibold">{label}</div>
            {Icon && (
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border backdrop-blur-xl", config.border, "bg-white/[0.04]")}>
                <Icon className={cn("w-4 h-4", config.color)} />
              </div>
            )}
          </div>
          <div className="mt-3">
            <div className={cn("text-[28px] font-bold leading-none tracking-tight", config.color)}>{value}</div>
            {change && <div className="text-[11px] text-white/50 mt-1">{change}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
