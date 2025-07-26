import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function BottlenecksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Bottlenecks</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users />
            Crowd and Traffic Bottlenecks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will display detailed information and analytics on crowd and traffic bottlenecks. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
