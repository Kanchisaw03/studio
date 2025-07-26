"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardCard } from "./dashboard-card"
import { AlertTriangle } from "lucide-react"
import type { Anomaly } from "@/types"
import { fetchAnomalies } from "@/services/mock-data"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AnomalyTable() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAnomalies = async () => {
      const data = await fetchAnomalies(20)
      setAnomalies(data)
      setLoading(false)
    }
    getAnomalies()
  }, [])

  const getRowClass = (type: Anomaly["type"]) => {
    switch (type) {
      case "fire":
        return "bg-red-500/10 hover:bg-red-500/20 text-red-500"
      case "smoke":
        return "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500"
      default:
        return ""
    }
  }

  return (
    <DashboardCard title="Anomaly Log" icon={AlertTriangle} className="col-span-1 md:col-span-2 lg:col-span-3">
       <ScrollArea className="h-96">
        <Table>
          <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-sm">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : anomalies.length > 0 ? (
              anomalies.map((anomaly) => (
                <TableRow key={anomaly.id} className={cn(getRowClass(anomaly.type))}>
                  <TableCell className="font-mono text-xs">{anomaly.id.slice(0, 12)}...</TableCell>
                  <TableCell className="font-medium capitalize">{anomaly.type.replace("_", " ")}</TableCell>
                  <TableCell className="capitalize">{anomaly.severity}</TableCell>
                  <TableCell>{anomaly.zone}</TableCell>
                  <TableCell className="text-right text-xs">
                    {format(new Date(anomaly.timestamp), "MMM d, yyyy HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No anomalies detected.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </DashboardCard>
  )
}
