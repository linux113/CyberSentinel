import { Search, Bell, ChevronDown, Shield, Zap } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function TopNav() {
  const { notifications, markAllRead, searchQuery, setSearchQuery, environment, setEnvironment, isDemoMode, setDemoMode } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEnv, setShowEnv] = useState(false);

  const unread = notifications.filter(n=>!n.read).length;

  return (
    <header className="h-[64px] sticky top-0 z-20 bg-[#0a0f17]/80 backdrop-blur-2xl border-b border-sentinel-border flex items-center gap-4 px-6">
      {/* Environment selector */}
      <div className="relative">
        <button onClick={()=>setShowEnv(!showEnv)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium hover:bg-white/[0.06] transition-colors">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
          <span className="text-sentinel-muted">{environment}</span>
          <span className="text-sentinel-text">Environment</span>
          <ChevronDown className="w-3 h-3 text-sentinel-dim" />
        </button>
        {showEnv && (
          <div className="absolute top-full mt-2 left-0 w-48 glass-panel rounded-lg p-1 z-50">
            {['Production','Staging','Development','Lab'].map(env => (
              <button key={env} onClick={()=>{setEnvironment(env); setShowEnv(false);}} className="w-full text-left px-3 py-2 rounded-md text-[13px] hover:bg-white/[0.06] transition-colors">
                {env}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-[480px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
        <input
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          placeholder="Search alerts, incidents, assets, IPs, CVEs..."
          className="w-full h-9 pl-9 pr-4 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] placeholder:text-sentinel-dim focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] transition-all"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono text-sentinel-muted">⌘K</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Demo Mode Toggle */}
        <button
          onClick={()=>setDemoMode(!isDemoMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase border transition-all ${isDemoMode ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.15)]' : 'bg-white/5 text-sentinel-muted border-white/10'}`}
        >
          <Zap className="w-3 h-3" />
          Demo Mode
        </button>

        {/* System Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
          <span className="text-emerald-300">OPERATIONAL</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button onClick={()=>setShowNotifications(!showNotifications)} className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-colors relative">
            <Bell className="w-4 h-4 text-sentinel-muted" />
            {unread>0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#0a0f17]">
                {unread}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute top-full mt-2 right-0 w-[380px] glass-panel rounded-xl overflow-hidden z-50 shadow-2xl">
              <div className="p-4 border-b border-sentinel-border flex items-center justify-between">
                <h3 className="font-semibold text-[13px] uppercase tracking-wide">Notifications</h3>
                <button onClick={markAllRead} className="text-[11px] text-sky-400 hover:text-sky-300">Mark all read</button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map(n=>(
                  <div key={n.id} className={`p-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${n.severity==='CRITICAL'?'bg-red-400': n.severity==='HIGH'?'bg-orange-400': n.severity==='MEDIUM'?'bg-yellow-400':'bg-sky-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-white truncate">{n.title}</div>
                        <div className="text-[12px] text-sentinel-muted mt-0.5">{n.message}</div>
                        <div className="text-[11px] text-sentinel-dim mt-1 font-mono">{new Date(n.time).toLocaleTimeString()}</div>
                      </div>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0 mt-1" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-sentinel-border">
          <div className="hidden md:block text-right">
            <div className="text-[13px] font-medium leading-none">SOC Analyst</div>
            <div className="text-[11px] text-sentinel-muted">analyst@cybersentinel.local</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-bold text-[12px]">
            SA
          </div>
        </div>
      </div>

      {/* Demo banner */}
      {isDemoMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 opacity-60" />
      )}
    </header>
  );
}
