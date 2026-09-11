import { Search, Bell, ChevronDown, Zap } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useState } from 'react';
import { StatusButton, CyberButton } from '@/components/ui/21-button';
import { GlassCard } from '@/components/ui/21-card';

export function TopNav() {
  const { notifications, markAllRead, searchQuery, setSearchQuery, environment, setEnvironment, isDemoMode, setDemoMode } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEnv, setShowEnv] = useState(false);

  const unread = notifications.filter(n=>!n.read).length;

  return (
    <header className="h-[68px] sticky top-0 z-20 bg-[#0a0f17]/80 backdrop-blur-2xl border-b border-white/[0.06] flex items-center gap-4 px-6">
      {/* Environment selector - 21.dev */}
      <div className="relative">
        <button onClick={()=>setShowEnv(!showEnv)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-medium hover:bg-white/[0.06] hover:border-white/[0.10] transition-all backdrop-blur-xl group">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-white/50">{environment}</span>
          <span className="text-white font-medium">Environment</span>
          <ChevronDown className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
        </button>
        {showEnv && (
          <div className="absolute top-full mt-2 left-0 w-48 rounded-xl bg-[#0f1720]/90 backdrop-blur-2xl border border-white/[0.08] p-1.5 z-50 shadow-2xl">
            {['Production','Staging','Development','Lab'].map(env => (
              <button key={env} onClick={()=>{setEnvironment(env); setShowEnv(false);}} className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] hover:bg-white/[0.06] transition-colors flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${env === environment ? 'bg-emerald-400' : 'bg-white/20'}`} />
                {env}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search - 21.dev */}
      <div className="flex-1 max-w-[480px] relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors" />
        <input
          value={searchQuery}
          onChange={e=>setSearchQuery(e.target.value)}
          placeholder="Search alerts, incidents, assets, IPs, CVEs... (21.dev)"
          className="w-full h-10 pl-10 pr-12 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] placeholder:text-white/30 focus:outline-none focus:border-sky-500/30 focus:bg-white/[0.06] focus:shadow-[0_0_15px_rgba(14,165,233,0.1)] transition-all backdrop-blur-xl"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-white/40">⌘K</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">21.DEV</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 ml-auto">
        {/* Demo Mode Toggle - 21.dev CyberButton */}
        <CyberButton
          variant={isDemoMode ? 'primary' : 'secondary'}
          onClick={()=>setDemoMode(!isDemoMode)}
          icon={<Zap className="w-3.5 h-3.5" />}
        >
          Demo Mode
          <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300">21.DEV</span>
        </CyberButton>

        {/* System Status - 21.dev StatusButton */}
        <div className="hidden lg:flex">
          <StatusButton status="online">OPERATIONAL • 21.dev Premium</StatusButton>
        </div>

        {/* Notifications - 21.dev GlassCard */}
        <div className="relative">
          <button onClick={()=>setShowNotifications(!showNotifications)} className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.10] hover:scale-[1.02] transition-all relative backdrop-blur-xl group">
            <Bell className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
            {unread>0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#0a0f17] shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                {unread}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute top-full mt-3 right-0 w-[380px] z-50">
              <GlassCard className="rounded-2xl overflow-hidden shadow-2xl border-white/[0.08]">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                  <h3 className="font-semibold text-[13px] uppercase tracking-wide flex items-center gap-2">
                    Notifications
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300">21.DEV</span>
                  </h3>
                  <button onClick={markAllRead} className="text-[11px] text-sky-400 hover:text-sky-300 px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/15 transition-colors">Mark all read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map(n=>(
                    <div key={n.id} className={`p-4 border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors group ${!n.read ? 'bg-white/[0.02]' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.severity==='CRITICAL'?'bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.5)]': n.severity==='HIGH'?'bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.5)]': n.severity==='MEDIUM'?'bg-yellow-400':'bg-sky-400'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-white truncate group-hover:text-white">{n.title}</div>
                          <div className="text-[12px] text-white/50 mt-0.5">{n.message}</div>
                          <div className="text-[11px] text-white/30 mt-1 font-mono flex items-center gap-2">
                            {new Date(n.time).toLocaleTimeString()}
                            <span className="px-1.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[9px]">{n.severity}</span>
                          </div>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </div>

        {/* Profile - 21.dev */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
          <div className="hidden md:block text-right">
            <div className="text-[13px] font-medium leading-none flex items-center gap-2">
              SOC Analyst
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="text-[11px] text-white/40 font-mono">analyst@cybersentinel.local • 21.dev</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-blue-500 to-sky-500 flex items-center justify-center text-white font-bold text-[12px] shadow-[0_0_15px_rgba(139,92,246,0.3)] border border-white/[0.08]">
            SA
          </div>
        </div>
      </div>

      {/* Demo banner - 21.dev gradient */}
      {isDemoMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 via-violet-500 to-sky-500 opacity-60" />
      )}
    </header>
  );
}
