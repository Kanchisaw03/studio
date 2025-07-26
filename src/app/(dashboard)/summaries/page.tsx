'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wand2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { summarizeEvents } from '@/ai/flows/summarize-events';
import { getAnomalies } from '@/services/mock-data';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface Summary {
  timestamp: string;
  content: string;
}

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load existing summaries from localStorage or an API if available
    // For now, we start with an empty list.
  }, []);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const recentEvents = getAnomalies(5).map(e => ({
        id: e.id,
        type: e.type,
        severity: e.severity,
        zone: e.zone,
        timestamp: e.timestamp,
      }));
      
      const result = await summarizeEvents({ events: recentEvents });
      const newSummary: Summary = {
        timestamp: new Date().toISOString(),
        content: result.summary,
      };
      setSummaries(prev => [newSummary, ...prev]);
    } catch (error) {
      console.error('Error generating summary:', error);
      // You could use a toast notification here to show the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Summaries</h1>
        <Button onClick={handleGenerateSummary} disabled={loading}>
          <Wand2 className="mr-2 h-4 w-4" />
          {loading ? 'Generating...' : 'Generate New Summary'}
        </Button>
      </div>

      <div className="space-y-4">
        {loading && summaries.length === 0 && (
           <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        )}

        {summaries.map((summary, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText />
                <span>Event Summary</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(summary.timestamp), "MMM d, yyyy HH:mm:ss")}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{summary.content}</p>
            </CardContent>
          </Card>
        ))}

        {!loading && summaries.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No summaries generated yet. Click the button above to create one.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
