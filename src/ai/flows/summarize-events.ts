// Summarize recent events to provide a quick understanding of the current situation.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventsInputSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      severity: z.string(),
      zone: z.string(),
      timestamp: z.string(),
    })
  ).describe('An array of recent event objects.'),
});

export type SummarizeEventsInput = z.infer<typeof SummarizeEventsInputSchema>;

const SummarizeEventsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the recent events.'),
});

export type SummarizeEventsOutput = z.infer<typeof SummarizeEventsOutputSchema>;

export async function summarizeEvents(input: SummarizeEventsInput): Promise<SummarizeEventsOutput> {
  return summarizeEventsFlow(input);
}

const summarizeEventsPrompt = ai.definePrompt({
  name: 'summarizeEventsPrompt',
  input: {schema: SummarizeEventsInputSchema},
  output: {schema: SummarizeEventsOutputSchema},
  prompt: `You are an AI assistant helping a commander understand the current situation. Summarize the following recent events in a concise and informative way:\n\n{% each events %}\n- Type: {{type}}, Severity: {{severity}}, Zone: {{zone}}, Timestamp: {{timestamp}}\n{% endeach %}\n\nSummary: `,
});

const summarizeEventsFlow = ai.defineFlow(
  {
    name: 'summarizeEventsFlow',
    inputSchema: SummarizeEventsInputSchema,
    outputSchema: SummarizeEventsOutputSchema,
  },
  async input => {
    const {output} = await summarizeEventsPrompt(input);
    return output!;
  }
);
