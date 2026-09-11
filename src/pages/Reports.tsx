import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboardStats, getAlerts, getIncidents, getVulnerabilities } from '../services/api';

export function ReportsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(()=>{
    Promise.all([getDashboardStats(), getAlerts(), getIncidents(), getVulnerabilities()]).then(([s,a,i,v])=>{
      setStats({
        totalEvents: 24521,
        critical: a.filter((x:any)=>x.severity==='CRITICAL').length,
        high: a.filter((x:any)=>x.severity==='HIGH').length,
        medium: a.filter((x:any)=>x.severity==='MEDIUM').length,
        low: a.filter((x:any)=>x.severity==='LOW').length,
        incidents: i.length,
        vulns: v.length,
        topThreat: 'Brute Force',
        mostAffected: 'WEB-SERVER-01',
        ...s
      });
    });
  },[]);

  const reports = [
    { id: 'daily', title: 'Daily Security Summary', desc: '24h overview of threats, incidents, vulnerabilities', period: 'Last 24 hours' },
    { id: 'incident', title: 'Incident Report', desc: 'Detailed incident timeline, impact, response', period: 'Last 7 days' },
    { id: 'vuln', title: 'Vulnerability Report', desc: 'Open vulnerabilities, CVSS, remediation status', period: 'Current' },
    { id: 'threat', title: 'Threat Intelligence Report', desc: 'Top threat categories, sources, trends', period: 'Last 30 days' },
    { id: 'asset', title: 'Asset Security Report', desc: 'Asset risk scores, health, exposure', period: 'Current' },
  ];

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Security Reports</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Generate and export security reports</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reports.map(r=>(
          <Card key={r.id} className="hover:bg-white/[0.03] transition-colors">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px]">{r.title}</div>
                    <div className="text-[12px] text-sentinel-muted mt-1">{r.desc}</div>
                    <div className="text-[11px] font-mono text-sentinel-dim mt-2">{r.period}</div>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-semibold flex items-center gap-1 hover:bg-white/90">
                  <Download className="w-3 h-3" /> Generate
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats && (
        <Card>
          <CardHeader><CardTitle>Sample Report Preview — CyberSentinel Security Report • Sept 1–10</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-[13px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div className="text-sentinel-muted text-[11px] uppercase">Total Events</div><div className="font-mono font-bold text-[18px] mt-1">{stats.totalEvents.toLocaleString()}</div></div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div className="text-sentinel-muted text-[11px] uppercase">Critical</div><div className="font-mono font-bold text-[18px] mt-1 text-red-400">{stats.critical}</div></div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div className="text-sentinel-muted text-[11px] uppercase">High</div><div className="font-mono font-bold text-[18px] mt-1 text-orange-400">{stats.high}</div></div>
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div className="text-sentinel-muted text-[11px] uppercase">Security Score</div><div className="font-mono font-bold text-[18px] mt-1">{stats.securityScore}/100</div></div>
            </div>
            <div className="space-y-2">
              <div><span className="text-sentinel-muted">Top Threat:</span> {stats.topThreat}</div>
              <div><span className="text-sentinel-muted">Most Affected Asset:</span> {stats.mostAffected}</div>
              <div><span className="text-sentinel-muted">Active Incidents:</span> {stats.activeIncidents}</div>
              <div><span className="text-sentinel-muted">Vulnerabilities:</span> {stats.vulnerabilities.critical} Critical, {stats.vulnerabilities.high} High</div>
            </div>
            <div>
              <div className="font-semibold mb-2">Recommended Actions:</div>
              <ul className="list-disc pl-5 space-y-1 text-sentinel-muted">
                <li>Patch vulnerable systems (WEB-SERVER-01, ADMIN-PORTAL)</li>
                <li>Review suspicious authentication activity</li>
                <li>Block malicious IPs at firewall/WAF</li>
                <li>Enforce MFA on admin accounts</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
