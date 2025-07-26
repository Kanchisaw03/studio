"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { fetchSystemStatus } from "@/services/mock-data";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export function StatusPanel() {
  const [status, setStatus] = useState<'Online' | 'Offline' | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      const { status, lastUpdate } = await fetchSystemStatus();
      setStatus(status);
      setLastUpdate(new Date(lastUpdate));
    };
    getStatus();
    const interval = setInterval(getStatus, 15000); // Check status every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const isOnline = status === 'Online';

  return (
    <DashboardCard title="System Status" icon={isOnline ? Wifi : WifiOff}>
      {!status ? (
        <div className="flex items-center space-x-4 pt-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 pt-2">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isOnline ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
            {isOnline ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
          </div>
          <div>
            <p className={`text-xl font-bold ${isOnline ? "text-green-500" : "text-red-500"}`}>
              {status}
            </p>
            {lastUpdate && (
              <p className="text-xs text-muted-foreground">
                Last update: {formatDistanceToNow(lastUpdate, { addSuffix: true })}
              </p>
            )}
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
