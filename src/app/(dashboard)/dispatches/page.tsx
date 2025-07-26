import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function DispatchesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Dispatches</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send />
            Dispatch Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will provide tools for managing and tracking dispatch teams. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
