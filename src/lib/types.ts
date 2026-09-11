export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AlertStatus = 'NEW' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED' | 'FALSE_POSITIVE';
export type IncidentStatus = 'NEW' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
export type AssetType = 'SERVER' | 'ENDPOINT' | 'DATABASE' | 'NETWORK' | 'APPLICATION' | 'CLOUD';
export type AssetStatus = 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
export type VulnSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ThreatType = 'NETWORK_SCAN' | 'BRUTE_FORCE' | 'MALWARE' | 'WEB_ATTACK' | 'SUSPICIOUS_LOGIN' | 'VULNERABILITY' | 'DATA_EXFILTRATION' | 'ANOMALY';

export interface Alert {
  id: string;
  title: string;
  type: ThreatType;
  severity: Severity;
  riskScore: number;
  sourceIp: string;
  destinationIp: string;
  sourcePort?: number;
  destinationPort?: number;
  protocol: string;
  sensor: string;
  description: string;
  signature?: string;
  timestamp: string;
  status: AlertStatus;
  assetId?: string;
  isSimulation?: boolean;
  evidence: {
    description: string;
    indicators: string[];
    rawLogSnippet?: string;
  };
  aiAnalysis?: AIAnalysis;
  recommendation?: string[];
}

export interface AIAnalysis {
  whatHappened: string;
  whySuspicious: string;
  riskAssessment: string;
  potentialImpact: string;
  recommendedActions: string[];
  confidence: number;
  observedEvidence: string[];
  inference: string[];
  timestamp: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  riskScore: number;
  status: IncidentStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  affectedAssets: string[];
  relatedAlerts: string[];
  timeline: TimelineEvent[];
  notes: string;
  aiAnalysis?: AIAnalysis;
  description: string;
  isSimulation?: boolean;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: 'DETECTION' | 'ANALYSIS' | 'ASSIGNMENT' | 'ACTION' | 'CONTAINMENT' | 'RESOLUTION' | 'NOTE';
  actor?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  ip: string;
  os: string;
  status: AssetStatus;
  riskScore: number;
  vulnerabilities: number;
  activeAlerts: number;
  lastSeen: string;
  openPorts: number[];
  tags: string[];
}

export interface Vulnerability {
  id: string;
  name: string;
  asset: string;
  assetId: string;
  severity: VulnSeverity;
  cvss: number;
  description: string;
  impact: string;
  remediation: string;
  status: 'OPEN' | 'PATCHED' | 'MITIGATED' | 'IGNORED';
  detectedAt: string;
  cve?: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: ThreatType;
  severity: Severity;
  source: string;
  destination: string;
  description: string;
  risk: number;
  isSimulation?: boolean;
}

export interface DashboardStats {
  securityScore: number;
  previousScore: number;
  scoreChange: number;
  lastUpdated: string;
  threatCounts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  activeIncidents: number;
  activeThreats: number;
  assetsMonitored: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface ThreatIntelResult {
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

export interface Report {
  id: string;
  title: string;
  type: 'DAILY' | 'INCIDENT' | 'VULNERABILITY' | 'THREAT_INTEL' | 'ASSET';
  generatedAt: string;
  period: string;
  summary: string;
  data: any;
}
