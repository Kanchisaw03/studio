import { CrowdDensityChart } from "../components/crowd-density-chart";
import { DispatchStatsChart } from "../components/dispatch-stats-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrafficCone } from "lucide-react";


export default function BottlenecksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Bottlenecks</h1>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <CrowdDensityChart />
        <DispatchStatsChart />
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrafficCone />
              Traffic Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This section will display a map with real-time traffic hotspots and congestion analysis. Development is in progress.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
