"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, FireExtinguisher, Zap, Users, ShieldAlert, Siren } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { fetchAlerts, generateAlert } from "@/services/mock-data";
import type { Alert } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

const alertIcons = {
  fire: FireExtinguisher,
  smoke: AlertTriangle,
  crowd: Users,
  power: Zap,
  medical: ShieldAlert,
  default: Siren,
};

const alertColors = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  medium: "border-l-yellow-500",
  low: "border-l-blue-500",
};

export function AlertsFeed() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlerts = async () => {
      const initialAlerts = await fetchAlerts();
      setAlerts(initialAlerts);
      setLoading(false);
    };
    getAlerts();

    const interval = setInterval(() => {
      const newAlert = generateAlert(alerts.length + 1);
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts].slice(0, 20));
    }, 5000); // New alert every 5 seconds

    return () => clearInterval(interval);
  }, [alerts.length]);

  return (
    <DashboardCard title="Real-time Alerts" icon={Siren} className="col-span-1 md:col-span-2 lg:col-span-1">
      <ScrollArea className="h-96 pr-4">
        <div className="space-y-4 pt-2">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
               <div className="flex items-center space-x-4" key={i}>
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            alerts.map((alert) => {
              const Icon = alertIcons[alert.type] || alertIcons.default;
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "flex items-start gap-4 p-3 rounded-lg border-l-4 bg-background/50 transition-all animate-in fade-in-20 slide-in-from-top-2",
                    alertColors[alert.severity]
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold capitalize">{alert.type} Alert in {alert.zone}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </DashboardCard>
  );
}
