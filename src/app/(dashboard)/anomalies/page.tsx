import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AnomaliesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Anomalies</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle />
            Anomaly Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will contain a detailed view of all anomalies. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
