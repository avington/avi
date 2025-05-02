import { StreamMessage, StreamMessageType } from '@avi/global/models';
import { deserializeFromString, serializeToString } from '@avi/global/services';
import { WebSocket } from 'ws';
import { processUpdatedQuotes } from '../../services/quotes/quote-process';

const stringDictionary: Record<StreamMessageType, (ws: WebSocket, ...args: unknown[]) => void> = {
  ['update_all_quotes']: processUpdatedQuotes,
};

export const updateAllQuotesStreamHandler = async (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (data: string) => {
    const message = deserializeFromString(data) as StreamMessage<null>;
    console.log(`Received message: ${message}`);
    stringDictionary?.[message.type]?.(ws, null);
    // Send a fake response
    ws.send(serializeToString({ message: `Fake response ${message}` }));
  });

  ws.send('Connected to WebSocket server and broadcasting messages');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};
