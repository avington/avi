import { WebSocket } from 'ws';

export const processUpdatedQuotes = async (ws: WebSocket, ...args: unknown[]): Promise<void> => {
  const symbols = args[0] as string[];

  // function implementation
};
