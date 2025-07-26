import { AlertsFeed } from './components/alerts-feed';
import { AnomalyTable } from './components/anomaly-table';
import { CrowdDensityChart } from './components/crowd-density-chart';
import { DispatchStatsChart } from './components/dispatch-stats-chart';
import { StatusPanel } from './components/status-panel';
import { SummaryLog } from './components/summary-log';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-4">
      <div className="grid lg:col-span-3 lg:grid-cols-3 gap-4 md:gap-8 auto-rows-min">
        <div className="col-span-1 md:col-span-3">
          <SummaryLog />
        </div>
        <CrowdDensityChart />
        <AlertsFeed />
        <AnomalyTable />
      </div>

      <div className="lg:col-span-1 flex flex-col gap-4 md:gap-8">
        <StatusPanel />
        <DispatchStatsChart />
      </div>
    </div>
  );
}
