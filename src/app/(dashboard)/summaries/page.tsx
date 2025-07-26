import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function SummariesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Summaries</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Generated Summaries Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will show a history of all AI-generated event summaries. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
