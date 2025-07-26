"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts"
import { DashboardCard } from "./dashboard-card"
import type { CrowdDensity } from "@/types"
import { fetchCrowdDensity } from "@/services/mock-data"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"

const DENSITY_THRESHOLD = 85;

export function CrowdDensityChart() {
  const [data, setData] = useState<CrowdDensity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialData = async () => {
      const initialData = await fetchCrowdDensity(20);
      setData(initialData);
      setLoading(false);
    }
    getInitialData();
  
    const interval = setInterval(async () => {
      const newDataPoint = (await fetchCrowdDensity(1))[0];
      setData(prevData => [...prevData.slice(1), newDataPoint]);
    }, 5000); // Add new data point every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard title="Live Crowd Density" icon={Users} className="col-span-1 md:col-span-2 lg:col-span-2">
      <div className="h-96 w-full pt-4">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 110]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelFormatter={(time) => new Date(time).toLocaleString()}
              />
              <ReferenceLine y={DENSITY_THRESHOLD} label={{ value: "Threshold", position: "insideTopRight", fill: "hsl(var(--destructive))", fontSize: 12 }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="density"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              {data.map((entry) => (
                entry.density > DENSITY_THRESHOLD && (
                  <ReferenceLine
                    key={entry.timestamp}
                    x={entry.timestamp}
                    stroke="hsl(var(--destructive) / 0.5)"
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardCard>
  )
}
