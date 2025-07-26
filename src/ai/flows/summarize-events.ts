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

export async function summarizeEvents(input: SummarizeEventsInput) {
  const { stream, response } = summarizeEventsStreamFlow(input);
  // The response promise must be awaited for the flow to complete.
  response.catch(e => console.error(e));
  return stream;
}

const summarizeEventsStreamFlow = ai.defineFlow(
  {
    name: 'summarizeEventsStreamFlow',
    inputSchema: SummarizeEventsInputSchema,
    // The output schema for a streaming flow is the type of the final, complete object, not the chunks.
    outputSchema: z.string(),
    stream: true,
  },
  async (input) => {
    const {stream} = await ai.generate({
      prompt: `You are an AI assistant helping a commander understand the current situation. Summarize the following recent events in a concise and informative way:

{{#each events}}
- Type: {{type}}, Severity: {{severity}}, Zone: {{zone}}, Timestamp: {{timestamp}}
{{/each}}

Summary:`,
      input: { events: input.events },
      model: 'googleai/gemini-2.0-flash',
      stream: true,
    });
    
    return stream.pipeThrough(
      new TransformStream<any, string>({
        transform(chunk, controller) {
          controller.enqueue(chunk.text);
        },
      })
    );
  }
);
