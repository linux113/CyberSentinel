import { Card, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown, Shield } from 'lucide-react';

export function SecurityPosture({ score, previousScore, change, lastUpdated }: { score: number; previousScore: number; change: number; lastUpdated: string }) {
  const status = score >= 80 ? 'GOOD' : score >= 60 ? 'FAIR' : score >= 40 ? 'AT RISK' : 'CRITICAL';
  const statusColor = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-yellow-400' : score >= 40 ? 'text-orange-400' : 'text-red-400';

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.04] to-transparent pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-sentinel-muted">Security Posture</div>
            <div className="text-[11px] text-sentinel-dim mt-1">CyberSentinel Risk Model</div>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${score>=80 ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/15 text-orange-400 border-orange-500/20'}`}>
            {status}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative w-[132px] h-[132px] shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={score>=80 ? '#22c55e' : score>=60 ? '#eab308' : '#ef4444'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-out"
                style={{ filter: `drop-shadow(0 0 8px ${score>=80 ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[36px] font-bold tracking-tight leading-none">{score}</div>
              <div className="text-[11px] text-sentinel-muted font-mono mt-1">/ 100</div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-sentinel-muted">Previous</span>
                <span className="text-[13px] font-mono font-medium">{previousScore}</span>
                <span className={`flex items-center gap-1 text-[12px] font-medium px-1.5 py-0.5 rounded ${change>=0 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                  {change>=0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {change>=0?'+':''}{change}%
                </span>
              </div>
              <div className="text-[11px] text-sentinel-dim mt-1 font-mono">Last updated {new Date(lastUpdated).toLocaleTimeString()}</div>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${score}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-sentinel-dim">
                <span>0</span><span>50</span><span>100</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-sentinel-muted">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              Calculated from critical/high impacts + vulnerabilities + unresolved incidents
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
