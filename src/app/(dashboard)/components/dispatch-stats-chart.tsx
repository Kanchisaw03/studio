"use client";

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DashboardCard } from './dashboard-card';
import type { DispatchStat } from '@/types';
import { fetchDispatchStats } from '@/services/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Send } from 'lucide-react';

export function DispatchStatsChart() {
  const [data, setData] = useState<DispatchStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await fetchDispatchStats();
      setData(stats);
      setLoading(false);
    };
    getStats();
    
    const interval = setInterval(getStats, 20000); // Refresh stats every 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard title="Active Dispatches by Zone" icon={Send}>
      <div className="h-60 w-full pt-4">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="zone" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardCard>
  );
}
