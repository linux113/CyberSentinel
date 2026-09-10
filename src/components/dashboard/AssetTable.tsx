import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge, severityToVariant, riskToVariant } from '../ui/Badge';
import { Asset } from '../../lib/types';
import { Link } from 'react-router-dom';

export function AssetTable({ assets }: { assets: Asset[] }) {
  const top = assets.slice(0,5);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Affected Assets</CardTitle>
        <Link to="/assets" className="text-[11px] text-sky-400 hover:text-sky-300">View all →</Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="text-[11px] uppercase tracking-wide text-sentinel-muted border-b border-white/[0.06]">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Asset</th>
                <th className="text-left px-3 py-3 font-medium">Type</th>
                <th className="text-left px-3 py-3 font-medium">Risk</th>
                <th className="text-left px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {top.map(a=>(
                <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-[11px] font-mono text-sentinel-dim">{a.ip}</div>
                  </td>
                  <td className="px-3 py-3"><Badge variant="neutral">{a.type}</Badge></td>
                  <td className="px-3 py-3">
                    <span className={`font-mono font-bold ${a.riskScore>=80?'text-red-400':a.riskScore>=60?'text-orange-400':a.riskScore>=30?'text-yellow-400':'text-emerald-400'}`}>{a.riskScore}</span>
                  </td>
                  <td className="px-3 py-3"><Badge variant={severityToVariant(a.status)}>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
