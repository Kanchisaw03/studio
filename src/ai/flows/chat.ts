
'use server';

import {ai} from '@/ai/genkit';
import { getAnomalies, getInitialAlerts } from '@/services/mock-data';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
  message: z.string(),
});

const ChatOutputSchema = z.object({
  response: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    
    // Provide the model with some context about the current state of the app
    const alerts = await getInitialAlerts(5);
    const anomalies = await getAnomalies(5);

    const {output} = await ai.generate({
      prompt: `
        You are Drishti, a helpful AI assistant for the command center.
        You can answer questions about the current situation, including alerts, anomalies, and other events.
        Be concise and helpful in your responses.
        
        Current Alerts:
        ${alerts.map(a => `- ${a.message}`).join('\n')}
        
        Current Anomalies:
        ${anomalies.map(a => `- ${a.type} in ${a.zone} (Severity: ${a.severity})`).join('\n')}
        
        The user is asking: ${input.message}
      `,
      history: input.history.map(h => ({
        role: h.role,
        content: [{ text: h.content }],
      })),
    });

    return { response: output?.text || 'Sorry, I could not process that.' };
  }
);
