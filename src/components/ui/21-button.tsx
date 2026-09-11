'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Shield, Zap } from 'lucide-react';

// 21.dev inspired - Rainbow Borders Button
export function RainbowBorderButton({ 
  children, 
  className,
  onClick,
  variant = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'small';
}) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 rounded-xl blur-[2px] opacity-75 group-hover:opacity-100 transition duration-300 group-hover:blur-[3px]" />
      <button
        onClick={onClick}
        className={cn(
          "relative w-full bg-[#0a0f17] rounded-xl border border-white/[0.08] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#0f1720] hover:border-white/[0.12] hover:scale-[1.01]",
          variant === 'small' ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[14px]"
        )}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </div>
  );
}

// Spinning Border Button - 21.dev trending
export function SpinningBorderButton({ 
  children, 
  className,
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-11 overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#070a0f] group",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0ea5e9_0%,#3b82f6_50%,#8b5cf6_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#0a0f17] px-6 py-1 text-[14px] font-semibold text-white backdrop-blur-3xl transition-all group-hover:bg-[#0f1720] gap-2">
        {children}
      </span>
    </button>
  );
}

// Shimmer Button - 21.dev style with shimmer effect
export function ShimmerButton({ 
  children, 
  className,
  onClick,
  icon,
  variant = 'primary'
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-xl font-semibold transition-all group",
        variant === 'primary' && "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]",
        variant === 'secondary' && "bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.15] backdrop-blur-xl",
        variant === 'ghost' && "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.06]",
        "px-6 py-3 text-[14px] gap-2",
        className
      )}
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </span>
      <span className="relative flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}

// Hover Shine Button - 21.dev trending
export function HoverShineButton({ 
  children, 
  className,
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#0f1720] border border-white/[0.08] px-6 py-3 font-semibold text-white transition-all hover:border-white/[0.15] hover:bg-[#111d2a]",
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative flex items-center gap-2 text-[14px]">
        {children}
      </span>
    </button>
  );
}

// Gradient Button with animated gradient - 21.dev style
export function GradientButton({ 
  children, 
  className,
  onClick,
  size = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'sm' | 'lg';
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl font-bold text-white overflow-hidden group transition-all",
        "bg-gradient-to-br from-sky-400 via-blue-500 to-violet-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]",
        size === 'sm' && "px-4 py-2 text-[12px]",
        size === 'default' && "px-6 py-3 text-[14px]",
        size === 'lg' && "px-8 py-4 text-[15px]",
        className
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

// Cyber Button - Unique for CyberSentinel, 21.dev inspired with grid and glow
export function CyberButton({ 
  children, 
  className,
  onClick,
  variant = 'primary',
  icon
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: React.ReactNode;
}) {
  const variants = {
    primary: "bg-[#0f1720] border-sky-500/20 text-sky-300 hover:border-sky-500/40 hover:text-sky-200 shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]",
    secondary: "bg-[#0f1720] border-white/[0.08] text-white/80 hover:border-white/[0.15] hover:text-white",
    danger: "bg-[#0f1720] border-red-500/20 text-red-300 hover:border-red-500/40 hover:text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    success: "bg-[#0f1720] border-emerald-500/20 text-emerald-300 hover:border-emerald-500/40 hover:text-emerald-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl border backdrop-blur-xl font-semibold transition-all group overflow-hidden",
        "px-5 py-2.5 text-[13px] gap-2",
        variants[variant],
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)] -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative flex items-center gap-2">
        {icon}
        {children}
      </span>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />
    </motion.button>
  );
}

// Magnetic Button - 21.dev trending with magnetic hover
export function MagneticButton({ 
  children, 
  className,
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-white text-black font-bold px-8 py-3 text-[14px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow group",
        className
      )}
    >
      <span className="relative flex items-center gap-2">
        {children}
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </span>
    </motion.button>
  );
}

// Pill Button with status - Unique SOC style
export function StatusButton({ 
  children, 
  status = 'online',
  className,
  onClick
}: { 
  children: React.ReactNode; 
  status?: 'online' | 'offline' | 'warning' | 'critical';
  className?: string;
  onClick?: () => void;
}) {
  const statusColors = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    offline: "bg-zinc-500",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    critical: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-xl text-[12px] font-medium text-white/80 hover:bg-white/[0.08] hover:border-white/[0.12] hover:text-white transition-all group",
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", statusColors[status])} />
      <span className="flex items-center gap-1.5">
        {children}
      </span>
    </button>
  );
}
