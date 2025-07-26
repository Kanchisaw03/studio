import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Send, CheckCircle, Clock, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data, as we don't have a service for this yet.
const dispatches = [
  { id: 'D-001', team: 'Medical Team A', zone: 'Z1', status: 'on-site', priority: 'high' },
  { id: 'D-002', team: 'Fire Unit 3', zone: 'Z4', status: 'en-route', priority: 'critical' },
  { id: 'D-003', team: 'Security Patrol B', zone: 'Z2', status: 'resolved', priority: 'medium' },
  { id: 'D-004', team: 'Power Grid Crew', zone: 'Z5', status: 'active', priority: 'medium' },
  { id: 'D-005', team: 'Medical Team B', zone: 'Z4', status: 'en-route', priority: 'high' },
  { id: 'D-006', team: 'Fire Unit 1', zone: 'Z1', status: 'resolved', priority: 'low' },
];

const statusIcons = {
  'active': <Clock className="h-4 w-4 text-blue-500" />,
  'en-route': <Truck className="h-4 w-4 text-orange-500" />,
  'on-site': <Send className="h-4 w-4 text-yellow-500" />,
  'resolved': <CheckCircle className="h-4 w-4 text-green-500" />,
};

const statusColors = {
  'active': 'bg-blue-500/10 text-blue-500',
  'en-route': 'bg-orange-500/10 text-orange-500',
  'on-site': 'bg-yellow-500/10 text-yellow-500',
  'resolved': 'bg-green-500/10 text-green-500',
};

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispatches.map((dispatch) => (
                <TableRow key={dispatch.id}>
                  <TableCell className="font-mono">{dispatch.id}</TableCell>
                  <TableCell>{dispatch.team}</TableCell>
                  <TableCell>{dispatch.zone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       {statusIcons[dispatch.status as keyof typeof statusIcons]}
                       <span className={`capitalize ${statusColors[dispatch.status as keyof typeof statusColors]}`}>{dispatch.status.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={dispatch.priority === 'critical' ? 'destructive' : 'secondary'} className="capitalize">{dispatch.priority}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
