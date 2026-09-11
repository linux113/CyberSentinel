import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Brain, 
  Search, 
  Server, 
  Network, 
  FileText, 
  Settings,
  Bug,
  Clock,
  Shield
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/live-threats', label: 'Live Threats', icon: Activity, badge: 'LIVE' },
  { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  { path: '/incidents', label: 'Incidents', icon: ShieldAlert },
  { path: '/threat-intel', label: 'Threat Intel', icon: Search },
  { path: '/vulnerabilities', label: 'Vulnerabilities', icon: Bug },
  { path: '/assets', label: 'Assets', icon: Server },
  { path: '/network', label: 'Network', icon: Network },
  { path: '/ai-analyst', label: 'AI Analyst', icon: Brain, highlight: true },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-[260px] shrink-0 h-screen sticky top-0 bg-[#0a0f17]/90 backdrop-blur-2xl border-r border-sentinel-border flex flex-col z-30">
      {/* Logo */}
      <div className="h-[64px] px-5 flex items-center gap-3 border-b border-sentinel-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-[15px] tracking-tight leading-none">CyberSentinel</div>
          <div className="text-[10px] tracking-[0.15em] text-sentinel-muted uppercase font-medium mt-0.5">Command Center</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group relative',
              isActive 
                ? 'bg-white/[0.06] text-white border border-white/[0.08] shadow-sm' 
                : 'text-sentinel-muted hover:text-sentinel-text hover:bg-white/[0.03] border border-transparent'
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-sky-400' : 'text-sentinel-dim group-hover:text-sentinel-muted')} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-subtle" />
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sentinel-border space-y-3">
        <div className="rounded-lg bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/20 p-3">
          <div className="text-[11px] font-semibold text-sky-300 tracking-wide uppercase mb-1">SOC Workflow</div>
          <div className="text-[11px] text-sentinel-muted leading-relaxed">
            Live Threat → Alert → Evidence → AI Analysis → Incident → Response → Report
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-sentinel-dim">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
          System Operational
          <span className="ml-auto font-mono">v0.1.0-demo</span>
        </div>
      </div>
    </aside>
  );
}
