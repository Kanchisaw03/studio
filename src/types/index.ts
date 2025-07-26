export interface Alert {
  id: string;
  type: 'fire' | 'smoke' | 'crowd' | 'power' | 'medical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  zone: string;
  timestamp: string;
  message: string;
}

export interface Anomaly {
  id: string;
  type: 'fire' | 'smoke' | 'crowd' | 'power_outage' | 'suspicious_activity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  zone: string;
  timestamp: string;
}

export interface Dispatch {
  id: string;
  team: string;
  zone: string;
  status: 'active' | 'en-route' | 'on-site' | 'resolved';
}

export interface CrowdDensity {
  timestamp: number;
  density: number;
}

export interface DispatchStat {
  zone: string;
  active: number;
}
