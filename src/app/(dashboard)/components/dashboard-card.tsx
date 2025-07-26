import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export function DashboardCard({ title, icon: Icon, children, className, actions }: DashboardCardProps) {
  return (
    <Card className={cn("bg-card/60 backdrop-blur-xl border-border/20 shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        {actions}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
