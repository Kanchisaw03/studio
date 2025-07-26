import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function SystemStatusPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">System Status</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity />
            System Health & Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will display detailed system health metrics and diagnostic information. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
