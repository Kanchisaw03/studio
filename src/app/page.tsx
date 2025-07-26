import { AlertsFeed } from './(dashboard)/components/alerts-feed';
import { AnomalyTable } from './(dashboard)/components/anomaly-table';
import { CrowdDensityChart } from './(dashboard)/components/crowd-density-chart';
import { DispatchStatsChart } from './(dashboard)/components/dispatch-stats-chart';
import { StatusPanel } from './(dashboard)/components/status-panel';
import { SummaryLog } from './(dashboard)/components/summary-log';

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
