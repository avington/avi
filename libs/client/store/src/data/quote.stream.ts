import { serializeToString } from '@avi/global/services';
import { StreamMessage } from '@avi/global/models';

let ws: WebSocket | null = null;
let wsOpenPromise: Promise<void> | null = null;

export const connectToStream = async () => {
  const url = `${process.env.VITE_API_URL}/quotes`;

  ws = new WebSocket(url);

  wsOpenPromise = new Promise((resolve, reject) => {
    if (ws) {
      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        resolve();
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      ws.onmessage = (event) => {
        console.log('Received message:', event.data);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
    } else {
      reject(new Error('WebSocket is not initialized'));
    }
  });
};

export const sendMessage = async <T>(obj: StreamMessage<T>) => {
  const message = serializeToString(obj);
  if (wsOpenPromise) {
    await wsOpenPromise;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      console.log('Message sent:', message);
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  } else {
    console.error('WebSocket connection has not been initiated.');
  }
};
