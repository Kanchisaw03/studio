import { AnomalyTable } from './components/anomaly-table';

export default function AnomaliesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Anomalies</h1>
      <AnomalyTable />
    </div>
  );
}
