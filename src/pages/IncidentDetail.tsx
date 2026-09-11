import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIncident, updateIncidentStatus, getAlerts, getAssets } from '../services/api';
import { Incident, Alert, Asset } from '../lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, severityToVariant } from '../components/ui/Badge';

export function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [relatedAlerts, setRelatedAlerts] = useState<Alert[]>([]);
  const [relatedAssets, setRelatedAssets] = useState<Asset[]>([]);
  const [newStatus, setNewStatus] = useState<Incident['status']>('INVESTIGATING');
  const [note, setNote] = useState('');

  useEffect(()=>{
    if (!id) return;
    getIncident(id).then(async inc=>{
      if (!inc) return;
      setIncident(inc);
      setNewStatus(inc.status);
      const allAlerts = await getAlerts();
      setRelatedAlerts(allAlerts.filter(a=>inc.relatedAlerts.includes(a.id)));
      const allAssets = await getAssets();
      setRelatedAssets(allAssets.filter(a=>inc.affectedAssets.includes(a.id)));
    });
  },[id]);

  const handleStatusUpdate = async () => {
    if (!incident) return;
    const updated = await updateIncidentStatus(incident.id, newStatus, note);
    setIncident(updated);
    setNote('');
  };

  if (!incident) return <div className="p-8 text-sentinel-muted">Loading incident...</div>;

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex items-center gap-2 text-[12px] text-sentinel-muted">
        <Link to="/incidents" className="hover:text-white">Incidents</Link>
        <span>→</span>
        <span className="text-white font-mono">{incident.id}</span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-bold tracking-tight flex items-center gap-3">
            {incident.title}
            <Badge variant={severityToVariant(incident.severity)}>{incident.severity}</Badge>
            <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/10">{incident.status}</span>
          </h1>
          <p className="text-[13px] text-sentinel-muted mt-2">{incident.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader><CardTitle>Incident Timeline</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {incident.timeline.map(ev=>(
                <div key={ev.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[11px] ${ev.type==='DETECTION'?'bg-red-500/20 border-red-500/30 text-red-400': ev.type==='CONTAINMENT'?'bg-emerald-500/20 border-emerald-500/30 text-emerald-400':'bg-white/5 border-white/10'}`}>
                      {ev.type[0]}
                    </div>
                    <div className="w-px flex-1 bg-white/10 mt-2" />
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[13px]">{ev.title}</span>
                      <span className="text-[11px] font-mono text-sentinel-dim">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-[12px] text-sentinel-muted mt-1">{ev.description}</div>
                    {ev.actor && <div className="text-[11px] text-sentinel-dim mt-1">by {ev.actor}</div>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Related Alerts</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {relatedAlerts.map(a=>(
                <Link key={a.id} to={`/alerts/${a.id}`} className="block p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]">
                  <div className="flex items-center gap-2"><span className="font-mono text-[11px] text-sky-400">{a.id}</span><Badge variant={severityToVariant(a.severity)}>{a.severity}</Badge></div>
                  <div className="text-[13px] font-medium mt-1">{a.title}</div>
                </Link>
              ))}
              {relatedAlerts.length===0 && <div className="text-[13px] text-sentinel-muted">No related alerts</div>}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card>
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-[13px]">
              <div><span className="text-sentinel-muted">ID:</span> <span className="font-mono">{incident.id}</span></div>
              <div><span className="text-sentinel-muted">Risk:</span> <span className="font-mono font-bold">{incident.riskScore}</span></div>
              <div><span className="text-sentinel-muted">Created:</span> {new Date(incident.createdAt).toLocaleString()}</div>
              <div><span className="text-sentinel-muted">Updated:</span> {new Date(incident.updatedAt).toLocaleString()}</div>
              <div><span className="text-sentinel-muted">Assigned:</span> {incident.assignedTo || 'Unassigned'}</div>
              <div><span className="text-sentinel-muted">Assets:</span> {incident.affectedAssets.join(', ')}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <select value={newStatus} onChange={e=>setNewStatus(e.target.value as any)} className="w-full h-9 px-3 rounded-lg bg-white/[0.06] border border-white/[0.08] text-[13px]">
                <option value="NEW">NEW</option>
                <option value="INVESTIGATING">INVESTIGATING</option>
                <option value="CONTAINED">CONTAINED</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
              <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add note..." className="w-full h-20 p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[13px] resize-none" />
              <button onClick={handleStatusUpdate} className="w-full h-9 rounded-lg bg-white text-black font-semibold text-[13px] hover:bg-white/90">Update Incident</button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Affected Assets</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {relatedAssets.map(a=>(
                <Link key={a.id} to={`/assets/${a.id}`} className="block p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05]">
                  <div className="font-medium text-[13px]">{a.name}</div>
                  <div className="text-[11px] font-mono text-sentinel-muted">{a.ip} • Risk {a.riskScore}</div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
            <CardContent><pre className="text-[12px] whitespace-pre-wrap text-sentinel-muted">{incident.notes || 'No notes'}</pre></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
