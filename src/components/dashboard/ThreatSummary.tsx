import { Card, CardContent } from '../ui/Card';
import { AlertTriangle, ShieldAlert, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';

const cards = [
  { label: 'Critical', countKey: 'critical' as const, icon: ShieldAlert, color: 'critical', bg: 'from-red-500/10 to-red-600/5', border: 'border-red-500/20', text: 'text-red-400', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]' },
  { label: 'High', countKey: 'high' as const, icon: AlertTriangle, color: 'high', bg: 'from-orange-500/10 to-orange-600/5', border: 'border-orange-500/20', text: 'text-orange-400', glow: '' },
  { label: 'Medium', countKey: 'medium' as const, icon: AlertCircle, color: 'medium', bg: 'from-yellow-500/10 to-yellow-600/5', border: 'border-yellow-500/20', text: 'text-yellow-400', glow: '' },
  { label: 'Low', countKey: 'low' as const, icon: Info, color: 'low', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400', glow: '' },
];

export function ThreatSummary({ counts, onSelect }: { counts: { critical: number; high: number; medium: number; low: number; }; onSelect?: (sev: string)=>void }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map(c => (
        <Card key={c.label} className={clsx('relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform', c.border, c.glow)} >
          <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-60', c.bg)} />
          <CardContent className="p-4 relative">
            <div className="flex items-start justify-between">
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center border', c.border, `bg-${c.color}/10`)}>
                <c.icon className={clsx('w-4 h-4', c.text)} />
              </div>
              <span className={clsx('text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded border', c.border, c.text, `bg-${c.color}/10`)}>{c.label.toUpperCase()}</span>
            </div>
            <div className="mt-3">
              <div className="text-[28px] font-bold leading-none tracking-tight">{counts[c.countKey]}</div>
              <div className="text-[11px] text-sentinel-muted mt-1">Active threats</div>
            </div>
            <button onClick={()=>onSelect?.(c.label.toUpperCase())} className="mt-3 text-[11px] text-sentinel-muted hover:text-white transition-colors flex items-center gap-1">
              View details →
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
