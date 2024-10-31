import { serializeToString } from '@avi/global/services';
import { WebSocket } from 'ws';

export const updateAllQuotesStreamHandler = async (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Send a fake response
    ws.send(serializeToString({ message: `Fake response ${message}` }));
  });

  ws.send('Connected to WebSocket server and broadcasting messages');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
};
