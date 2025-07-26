# **App Name**: Drishti Command Center

## Core Features:

- Alerts Feed: Real-time Alerts Feed: Display a scrollable, animated feed of real-time alerts (e.g., fire, crowd density).
- Crowd Density: Crowd Density Chart: Show a live line graph of crowd density data from /bottlenecks, highlighting values exceeding a threshold in red. For demo purposes this graph will show random number generation but the backend will send timestamps with real data.
- Dispatch Stats: Dispatch Stats: Visualize active dispatches by zone using a bar or donut chart. Data will come from backend and zones for dispatch.
- Anomaly Table: Anomaly Table: Display a table of anomalies (ID, Type, Severity, Zone, Timestamp), highlighting rows in red for 'fire' and orange for 'smoke'. Data for table will come from a endpoint and can display things beyond smoke or fire such as power outages.
- Summary Log: Summary Log: Generate natural language summaries of events from /summaries (e.g., 'Medic dispatched to Z2 after smoke alert'). An AI tool to help with summaries when triggered.
- Status Panel: System Status: Indicate system status (Online/Offline) with a visual indicator and last update timestamp.
- Theme Toggle: Dynamic Theme Toggle: Implement a dark/light theme toggle (🌙/☀) with preference persistence (saved to localStorage).

## Style Guidelines:

- Primary color: Subtle blue (#6699CC) reflecting reliability and authority.
- Background color: Dark gray (#282c34) for dark mode, light gray (#f0f2f5) for light mode, maintaining low saturation.
- Accent color: Soft orange (#D4A373) for alerts and highlights, providing contrast without harshness.
- Font: 'Lato' (sans-serif) for a clean, readable interface. Note: currently only Google Fonts are supported.
- Glassy cards with subtle shadows for a modern, Google Workspace-inspired look.
- Smooth, subtle animations for alert cards and transitions using Framer Motion or Tailwind Animate.
- Simple, clear icons for navigation and status indicators, following Material Design guidelines.