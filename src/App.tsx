import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LiveThreats } from './pages/LiveThreats';
import { AlertsPage } from './pages/Alerts';
import { AlertDetail } from './pages/AlertDetail';
import { IncidentsPage } from './pages/Incidents';
import { IncidentDetail } from './pages/IncidentDetail';
import { ThreatIntel } from './pages/ThreatIntel';
import { VulnerabilitiesPage } from './pages/Vulnerabilities';
import { AssetsPage } from './pages/Assets';
import { AssetDetail } from './pages/AssetDetail';
import { NetworkPage } from './pages/Network';
import { AIAnalyst } from './pages/AIAnalyst';
import { ReportsPage } from './pages/Reports';
import { TimelinePage } from './pages/Timeline';
import { SettingsPage } from './pages/Settings';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Layout>{children}</Layout>
    </AppProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/live-threats" element={<ProtectedLayout><LiveThreats /></ProtectedLayout>} />
        <Route path="/alerts" element={<ProtectedLayout><AlertsPage /></ProtectedLayout>} />
        <Route path="/alerts/:id" element={<ProtectedLayout><AlertDetail /></ProtectedLayout>} />
        <Route path="/incidents" element={<ProtectedLayout><IncidentsPage /></ProtectedLayout>} />
        <Route path="/incidents/:id" element={<ProtectedLayout><IncidentDetail /></ProtectedLayout>} />
        <Route path="/threat-intel" element={<ProtectedLayout><ThreatIntel /></ProtectedLayout>} />
        <Route path="/vulnerabilities" element={<ProtectedLayout><VulnerabilitiesPage /></ProtectedLayout>} />
        <Route path="/assets" element={<ProtectedLayout><AssetsPage /></ProtectedLayout>} />
        <Route path="/assets/:id" element={<ProtectedLayout><AssetDetail /></ProtectedLayout>} />
        <Route path="/network" element={<ProtectedLayout><NetworkPage /></ProtectedLayout>} />
        <Route path="/ai-analyst" element={<ProtectedLayout><AIAnalyst /></ProtectedLayout>} />
        <Route path="/reports" element={<ProtectedLayout><ReportsPage /></ProtectedLayout>} />
        <Route path="/timeline" element={<ProtectedLayout><TimelinePage /></ProtectedLayout>} />
        <Route path="/settings" element={<ProtectedLayout><SettingsPage /></ProtectedLayout>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
