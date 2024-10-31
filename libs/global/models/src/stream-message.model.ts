import { StreamMessageType } from './stream-message.types';

export interface StreamMessage<T> {
  type: StreamMessageType;
  payload: T;
}
