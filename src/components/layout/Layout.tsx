import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useApp } from '../../store/AppContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isDemoMode } = useApp();
  return (
    <div className="min-h-screen bg-sentinel-bg text-sentinel-text flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav />
        {isDemoMode && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center gap-3 text-[12px]">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold tracking-wide text-[10px] uppercase">Demo Environment</span>
            <span className="text-amber-200/70">Showing simulated security telemetry. Data is not real-world. Future integration: Suricata → EVE JSON → Backend → MongoDB → Dashboard</span>
          </div>
        )}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
