import { z } from 'zod';

export interface Alert {
  id: string;
  type: 'fire' | 'smoke' | 'crowd' | 'power' | 'medical';
  severity: 'low' | 'medium' | 'high' | 'critical';
  zone: string;
  timestamp: string;
  message: string;
}

export interface Anomaly {
  id: string;
  type: 'fire' | 'smoke' | 'crowd' | 'power_outage' | 'suspicious_activity';
  severity: 'critical' | 'high' | 'medium' | 'low';
  zone: string;
  timestamp: string;
}

export interface Dispatch {
  id: string;
  team: string;
  zone: string;
  status: 'active' | 'en-route' | 'on-site' | 'resolved';
}

export interface CrowdDensity {
  timestamp: number;
  density: number;
}

export interface DispatchStat {
  zone: string;
  active: number;
}

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;


export const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


export const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
