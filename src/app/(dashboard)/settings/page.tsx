import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This page will contain configuration options for the command center. Development is in progress.</p>
        </CardContent>
      </Card>
    </div>
  );
}
