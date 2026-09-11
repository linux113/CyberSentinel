import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'critical' | 'high' | 'medium' | 'low' | 'healthy' | 'info' | 'neutral' | 'warning';

const variantStyles: Record<BadgeVariant, string> = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/30 shadow-[0_0_12px_rgba(239,68,68,0.15)]',
  high: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  healthy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  neutral: 'bg-white/5 text-sentinel-muted border-white/10',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
};

export function Badge({ variant = 'neutral', children, className, pulse }: { variant?: BadgeVariant; children: React.ReactNode; className?: string; pulse?: boolean }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase border backdrop-blur-sm',
      variantStyles[variant],
      className
    )}>
      {pulse && <span className={clsx('w-1.5 h-1.5 rounded-full animate-pulse-subtle', 
        variant==='critical' ? 'bg-red-400' : variant==='high' ? 'bg-orange-400' : 'bg-current'
      )} />}
      {children}
    </span>
  );
}

export function severityToVariant(sev: string): BadgeVariant {
  switch(sev) {
    case 'CRITICAL': return 'critical';
    case 'HIGH': return 'high';
    case 'MEDIUM': return 'medium';
    case 'LOW': return 'low';
    case 'HEALTHY': return 'healthy';
    case 'WARNING': return 'warning';
    default: return 'neutral';
  }
}

export function riskToVariant(score: number): BadgeVariant {
  if (score >= 85) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}
