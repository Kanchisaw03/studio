'use client';

import { useState } from 'react';
import { FileText, Wand2 } from 'lucide-react';
import { summarizeEvents } from '@/ai/flows/summarize-events';
import { getAnomalies } from '@/services/mock-data';
import { Button } from '@/components/ui/button';
import { DashboardCard } from './dashboard-card';
import { Skeleton } from '@/components/ui/skeleton';

export function SummaryLog() {
  const [summary, setSummary] = useState<string>('Click "Generate Summary" to get an overview of recent events.');
  const [loading, setLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setLoading(true);
    setSummary('');
    try {
      // Use mock data to feed the summarizer
      // In a real app, this would come from a real-time data source
      const recentEvents = getAnomalies(5).map(e => ({
        id: e.id,
        type: e.type,
        severity: e.severity,
        zone: e.zone,
        timestamp: e.timestamp,
      }));
      
      const result = await summarizeEvents({ events: recentEvents });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardCard
      title="AI Event Summary"
      icon={FileText}
      actions={
        <Button variant="ghost" size="sm" onClick={handleGenerateSummary} disabled={loading}>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Summary
        </Button>
      }
    >
      <div className="pt-2 text-sm text-muted-foreground min-h-[60px]">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          summary
        )}
      </div>
    </DashboardCard>
  );
}
