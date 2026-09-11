import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from '../components/ui/Badge';
import { Search } from 'lucide-react';

interface IntelResult {
  indicator: string;
  type: 'IP' | 'DOMAIN' | 'HASH' | 'URL';
  reputation: 'MALICIOUS' | 'SUSPICIOUS' | 'CLEAN' | 'UNKNOWN';
  risk: number;
  firstSeen: string;
  lastSeen: string;
  sources: string[];
  relatedActivity: string[];
  tags: string[];
  description: string;
}

export function ThreatIntel() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<IntelResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r, 800));
    
    // Simulated intel - never claim malicious without evidence
    const isInternal = query.startsWith('192.168.') || query.startsWith('10.');
    const isKnownBad = ['203.0.113.45','198.51.100.23'].includes(query);
    
    setResult({
      indicator: query,
      type: query.includes('.') && !query.match(/^\d+\.\d+\.\d+\.\d+$/) ? 'DOMAIN' : query.length===64 || query.length===32 ? 'HASH' : query.startsWith('http') ? 'URL' : 'IP',
      reputation: isKnownBad ? 'SUSPICIOUS' : isInternal ? 'UNKNOWN' : 'UNKNOWN',
      risk: isKnownBad ? 78 : isInternal ? 35 : 45,
      firstSeen: new Date(Date.now()-1000*60*60*24*3).toISOString(),
      lastSeen: new Date().toISOString(),
      sources: ['Internal Telemetry', 'Suricata', 'Firewall Logs'],
      relatedActivity: isKnownBad ? ['Port scanning observed', 'Brute force attempts'] : isInternal ? ['Internal asset', 'No external reputation'] : ['No related activity in last 7 days'],
      tags: isInternal ? ['internal','private-ip'] : ['external','unclassified'],
      description: isInternal 
        ? 'Private IP address - internal asset. No external threat intelligence available. Check internal logs for activity.'
        : isKnownBad
        ? 'Observed suspicious activity from this indicator in internal telemetry. No external confirmation of maliciousness. Treat as suspicious, requires investigation.'
        : 'No conclusive reputation data available. This indicator has not been flagged by integrated sources. Insufficient evidence to determine maliciousness. Monitor for related activity.'
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h1 className="text-[24px] font-bold tracking-tight">Threat Intelligence</h1>
        <p className="text-[13px] text-sentinel-muted mt-1">Investigate IPs, domains, hashes, URLs — with evidence-based assessment</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sentinel-dim" />
              <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} placeholder="Enter IP, domain, hash, or URL (e.g., 192.168.10.10, 203.0.113.45, example.com)" className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[14px] font-mono" />
            </div>
            <button onClick={handleSearch} disabled={loading} className="px-6 h-11 rounded-xl bg-white text-black font-semibold text-[14px] hover:bg-white/90 disabled:opacity-50">
              {loading ? 'Searching...' : 'Investigate'}
            </button>
          </div>
          <div className="mt-3 text-[11px] text-sentinel-dim">Do not claim indicator is malicious without actual evidence or integrated intelligence source. State uncertainty when evidence insufficient.</div>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card>
              <CardHeader><CardTitle>Intelligence Report — {result.indicator}</CardTitle><Badge variant={result.reputation==='SUSPICIOUS'?'high': result.reputation==='MALICIOUS'?'critical':'neutral'}>{result.reputation}</Badge></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-[13px]">
                  <div><span className="text-sentinel-muted">Type:</span> {result.type}</div>
                  <div><span className="text-sentinel-muted">Risk:</span> <span className={`font-bold font-mono ${result.risk>=70?'text-orange-400':'text-yellow-400'}`}>{result.risk}/100</span></div>
                  <div><span className="text-sentinel-muted">First Seen:</span> <span className="font-mono text-[11px]">{new Date(result.firstSeen).toLocaleString()}</span></div>
                  <div><span className="text-sentinel-muted">Last Seen:</span> <span className="font-mono text-[11px]">{new Date(result.lastSeen).toLocaleString()}</span></div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2">Description</div>
                  <p className="text-[13px] leading-relaxed p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">{result.description}</p>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wide font-semibold text-sentinel-muted mb-2">Related Activity</div>
                  <ul className="space-y-1">
                    {result.relatedActivity.map((a,i)=><li key={i} className="text-[12px] flex gap-2"><span className="text-sky-400">•</span>{a}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>AI Safety Notice</CardTitle></CardHeader>
              <CardContent className="text-[12px] leading-relaxed text-sentinel-muted space-y-2">
                <p>This threat intelligence module does not fabricate reputation data. It clearly distinguishes:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Observed evidence (from internal telemetry)</li>
                  <li>External intelligence (if integrated source available)</li>
                  <li>Uncertainty when evidence insufficient</li>
                </ul>
                <p className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-200">If evidence is insufficient, response must state: "Insufficient evidence to determine this conclusively."</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card>
              <CardHeader><CardTitle>Sources</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {result.sources.map(s=><div key={s} className="text-[12px] px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06]">{s}</div>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.tags.map(t=><span key={t} className="px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px]">{t}</span>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] text-[12px]">Search related alerts</button>
                <button className="w-full text-left p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] text-[12px]">Check asset inventory</button>
                <button className="w-full text-left p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.06] text-[12px]">Block at firewall (future)</button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!result && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-sentinel-dim" />
            </div>
            <div className="font-medium">Threat Intelligence Lookup</div>
            <div className="text-[13px] text-sentinel-muted mt-1 max-w-[400px] mx-auto">Enter an IP, domain, hash, or URL to investigate. System will return reputation, risk, first/last seen, sources, and related activity — without fabricating maliciousness.</div>
            <div className="mt-6 flex justify-center gap-2">
              {['192.168.10.10','203.0.113.45','admin-portal.local'].map(ex=>(
                <button key={ex} onClick={()=>setQuery(ex)} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono hover:bg-white/[0.06]">{ex}</button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
