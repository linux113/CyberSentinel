import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from '../lib/types';
import { subscribeRealTime } from '../services/api';

interface AppContextType {
  isDemoMode: boolean;
  setDemoMode: (v: boolean) => void;
  notifications: Array<{ id: string; title: string; message: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO'; time: string; read: boolean; }>;
  addNotification: (n: { title: string; message: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO'; }) => void;
  markAllRead: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  latestAlerts: Alert[];
  environment: string;
  setEnvironment: (e: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setDemoMode] = useState(true);
  const [notifications, setNotifications] = useState<AppContextType['notifications']>([
    { id: '1', title: 'Critical alert detected', message: 'Possible brute force on ADMIN-PORTAL', severity: 'CRITICAL', time: new Date(Date.now()-1000*60*2).toISOString(), read: false },
    { id: '2', title: 'New vulnerability found', message: 'CVE-2021-41773 on WEB-SERVER-01', severity: 'HIGH', time: new Date(Date.now()-1000*60*15).toISOString(), read: false },
    { id: '3', title: 'Incident assigned', message: 'INC-0042 assigned to you', severity: 'MEDIUM', time: new Date(Date.now()-1000*60*30).toISOString(), read: true },
    { id: '4', title: 'AI analysis completed', message: 'Analysis for ALR-10042 ready', severity: 'INFO', time: new Date(Date.now()-1000*60*60).toISOString(), read: true },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [latestAlerts, setLatestAlerts] = useState<Alert[]>([]);
  const [environment, setEnvironment] = useState('Production');

  useEffect(() => {
    const unsub = subscribeRealTime((type, data) => {
      if (type === 'new-alert') {
        const alert = data as Alert;
        setLatestAlerts(prev => [alert, ...prev].slice(0,5));
        addNotification({
          title: `${alert.severity} alert: ${alert.title}`,
          message: `Source ${alert.sourceIp} → ${alert.destinationIp}`,
          severity: alert.severity as any
        });
      }
    });
    return unsub;
  }, []);

  const addNotification = (n: { title: string; message: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO'; }) => {
    setNotifications(prev => [{
      id: Date.now().toString(),
      ...n,
      time: new Date().toISOString(),
      read: false
    }, ...prev].slice(0,20));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n=>({...n, read: true})));
  };

  return (
    <AppContext.Provider value={{
      isDemoMode, setDemoMode,
      notifications, addNotification, markAllRead,
      searchQuery, setSearchQuery,
      latestAlerts,
      environment, setEnvironment
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
