export const mockAssets = [
  { id: 'AST-001', name: 'WEB-SERVER-01', type: 'SERVER', ip: '192.168.56.10', os: 'Ubuntu 22.04 LTS', status: 'HEALTHY', riskScore: 15, vulnerabilities: 1, activeAlerts: 0, lastSeen: new Date().toISOString(), openPorts: [80,443,22], tags: ['production','web'] },
  { id: 'AST-002', name: 'DB-01', type: 'DATABASE', ip: '192.168.56.20', os: 'PostgreSQL 15', status: 'HEALTHY', riskScore: 12, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date().toISOString(), openPorts: [5432,22], tags: ['production','database'] },
  { id: 'AST-006', name: 'ADMIN-PORTAL', type: 'APPLICATION', ip: '192.168.56.15', os: 'Nginx 1.24', status: 'HEALTHY', riskScore: 18, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date().toISOString(), openPorts: [443,80], tags: ['critical','admin'] },
  { id: 'AST-004', name: 'FIREWALL-01', type: 'NETWORK', ip: '192.168.56.1', os: 'pfSense 2.7', status: 'HEALTHY', riskScore: 8, vulnerabilities: 0, activeAlerts: 0, lastSeen: new Date().toISOString(), openPorts: [443,22], tags: ['network','perimeter'] },
];

import mongoose from 'mongoose';
import { Asset } from '../models/Asset.js';

export async function seedDatabase() {
  if (mongoose.connection.readyState !== 1) {
    console.log('[Seed] No DB connection, skipping seed');
    return;
  }
  try {
    const count = await Asset.countDocuments();
    if (count === 0) {
      await Asset.insertMany(mockAssets);
      console.log(`[Seed] Inserted ${mockAssets.length} assets`);
    } else {
      console.log(`[Seed] Assets already exist (${count}), skipping`);
    }
  } catch (err) {
    console.error('[Seed] Error', err.message);
  }
}
