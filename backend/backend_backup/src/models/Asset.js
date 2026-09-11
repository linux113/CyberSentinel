import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  type: { type: String, enum: ['SERVER','ENDPOINT','DATABASE','NETWORK','APPLICATION','CLOUD'] },
  ip: { type: String, index: true },
  os: String,
  status: { type: String, enum: ['HEALTHY','WARNING','CRITICAL','OFFLINE'], default: 'HEALTHY' },
  riskScore: { type: Number, default: 0 },
  vulnerabilities: { type: Number, default: 0 },
  activeAlerts: { type: Number, default: 0 },
  lastSeen: { type: Date, default: Date.now },
  openPorts: [Number],
  tags: [String]
}, { timestamps: true });

export const Asset = mongoose.model('Asset', AssetSchema);
