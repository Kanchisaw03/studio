
'use server';
/**
 * @fileOverview A conversational AI flow for the Drishti Command Center chatbot.
 * This flow uses tools to access real-time data about alerts and anomalies.
 */

import { ai } from '@/ai/genkit';
import { getAnomalies, getInitialAlerts } from '@/services/mock-data';
import { z } from 'zod';
import { ChatInputSchema, ChatOutputSchema, type ChatInput, type ChatOutput } from '@/types';

// Tool to get current alerts
const getAlertsTool = ai.defineTool(
  {
    name: 'getAlerts',
    description: 'Get the list of current alerts in the system.',
    inputSchema: z.object({
      count: z.number().optional().default(5).describe('Number of alerts to return.'),
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        type: z.string(),
        severity: z.string(),
        zone: z.string(),
        timestamp: z.string(),
        message: z.string(),
    })),
  },
  async (input) => {
    console.log(`Getting ${input.count} alerts`);
    return await getInitialAlerts(input.count);
  }
);

// Tool to get current anomalies
const getAnomaliesTool = ai.defineTool(
  {
    name: 'getAnomalies',
    description: 'Get the list of current anomalies in the system.',
    inputSchema: z.object({
        count: z.number().optional().default(5).describe('Number of anomalies to return.'),
    }),
    outputSchema: z.array(z.object({
        id: z.string(),
        type: z.string(),
        severity: z.string(),
        zone: z.string(),
        timestamp: z.string(),
    })),
  },
  async (input) => {
    console.log(`Getting ${input.count} anomalies`);
    return await getAnomalies(input.count);
  }
);


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
    
    const {output} = await ai.generate({
      prompt: input.message,
      history: input.history.map(h => ({
        role: h.role,
        content: [{ text: h.content }],
      })),
      tools: [getAlertsTool, getAnomaliesTool],
      system: `
        You are Drishti, a helpful AI assistant for the command center.
        You can answer questions about the current situation, including alerts, anomalies, and other events.
        Be concise and helpful in your responses. Use the available tools to answer questions about alerts and anomalies.
      `,
    });

    return { response: output?.text || 'Sorry, I could not process that.' };
  }
);
