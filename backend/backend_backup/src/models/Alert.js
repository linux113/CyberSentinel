import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['NETWORK_SCAN','BRUTE_FORCE','MALWARE','WEB_ATTACK','SUSPICIOUS_LOGIN','VULNERABILITY','DATA_EXFILTRATION','ANOMALY'], required: true },
  severity: { type: String, enum: ['CRITICAL','HIGH','MEDIUM','LOW','INFO'], required: true },
  riskScore: { type: Number, min: 0, max: 100, required: true },
  sourceIp: { type: String, required: true },
  destinationIp: { type: String, required: true },
  sourcePort: Number,
  destinationPort: Number,
  protocol: String,
  sensor: { type: String, default: 'Suricata' },
  description: String,
  signature: String,
  timestamp: { type: Date, default: Date.now, index: true },
  status: { type: String, enum: ['NEW','INVESTIGATING','CONTAINED','RESOLVED','CLOSED','FALSE_POSITIVE'], default: 'NEW' },
  assetId: String,
  isSimulation: { type: Boolean, default: false },
  evidence: {
    description: String,
    indicators: [String],
    rawLogSnippet: String
  },
  aiAnalysis: {
    whatHappened: String,
    whySuspicious: String,
    riskAssessment: String,
    potentialImpact: String,
    recommendedActions: [String],
    confidence: Number,
    observedEvidence: [String],
    inference: [String],
    timestamp: Date
  },
  recommendation: [String],
  eveRaw: mongoose.Schema.Types.Mixed // Original EVE JSON for forensics
}, { timestamps: true });

AlertSchema.index({ severity: 1, status: 1 });
AlertSchema.index({ timestamp: -1 });

export const Alert = mongoose.model('Alert', AlertSchema);

// In-memory fallback if MongoDB not connected
export const inMemoryAlerts = [];
