import type { Anomaly, Alert, CrowdDensity, DispatchStat } from '@/types';

const zones = ['Z1', 'Z2', 'Z3', 'Z4', 'Z5'];
const alertTypes: Alert['type'][] = ['fire', 'smoke', 'crowd', 'power', 'medical'];
const severities: Alert['severity'][] = ['low', 'medium', 'high', 'critical'];
const anomalyTypes: Anomaly['type'][] = ['fire', 'smoke', 'crowd', 'power_outage', 'suspicious_activity'];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateAlert = (id: number): Alert => ({
  id: `alert-${id}-${Date.now()}`,
  type: getRandomElement(alertTypes),
  severity: getRandomElement(severities),
  zone: getRandomElement(zones),
  timestamp: new Date().toISOString(),
  message: `Alert of type ${getRandomElement(alertTypes)} in zone ${getRandomElement(zones)}.`
});

export const generateAnomaly = (id: number): Anomaly => ({
  id: `anomaly-${id}`,
  type: getRandomElement(anomalyTypes),
  severity: getRandomElement(severities),
  zone: getRandomElement(zones),
  timestamp: new Date(Date.now() - Math.random() * 1000 * 3600 * 24).toISOString(),
});

export const getInitialAlerts = (count: number): Alert[] => {
  return Array.from({ length: count }, (_, i) => generateAlert(i + 1)).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getAnomalies = (count: number): Anomaly[] => {
  return Array.from({ length: count }, (_, i) => generateAnomaly(i + 1)).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getDispatchStats = (): DispatchStat[] => {
  return zones.map(zone => ({
    zone,
    active: Math.floor(Math.random() * 10) + 1,
  }));
};

let lastTimestamp = Date.now();
export const generateCrowdDensityData = (count: number): CrowdDensity[] => {
  const data: CrowdDensity[] = [];
  for (let i = 0; i < count; i++) {
    lastTimestamp += 5000;
    data.push({
      timestamp: lastTimestamp,
      density: Math.floor(Math.random() * 80) + 20, // Density between 20 and 100
    });
  }
  return data;
};

// Mock service functions to simulate API calls
// TODO: Replace these with actual API calls to your backend

export const fetchAlerts = async (): Promise<Alert[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getInitialAlerts(5)), 500));
};

export const fetchAnomalies = async (): Promise<Anomaly[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getAnomalies(15)), 500));
};

export const fetchDispatchStats = async (): Promise<DispatchStat[]> => {
  return new Promise(resolve => setTimeout(() => resolve(getDispatchStats()), 500));
};

export const fetchCrowdDensity = async (count = 20): Promise<CrowdDensity[]> => {
  return new Promise(resolve => setTimeout(() => resolve(generateCrowdDensityData(count)), 500));
};

export const fetchSystemStatus = async (): Promise<{ status: 'Online' | 'Offline'; lastUpdate: string }> => {
  return new Promise(resolve => setTimeout(() => resolve({
    status: Math.random() > 0.1 ? 'Online' : 'Offline',
    lastUpdate: new Date().toISOString(),
  }), 300));
};
