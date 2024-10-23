import { Request, Response } from 'express';

export type Handler = (req: Request, res: Response) => Promise<void>;

export interface Mediator {
  subscribe(event: string, handler: Handler): void;
  publish(event: string, req: Request, res: Response): Promise<void[]>;
  handlers?: { [key: string]: Handler[] };
}

export const handlers: { [key: string]: Handler[] } = {};

export const mediator: Mediator = {
  subscribe(event: string, handler: Handler) {
    if (!handlers[event]) {
      handlers[event] = [];
    }
    handlers[event].push(handler);
  },
  async publish(event: string, req: Request, res: Response): Promise<void[]> {
    const eventHandlers = handlers[event];
    if (eventHandlers) {
      const responses = await Promise.all(eventHandlers.map((handler) => handler(req, res)));
      return responses;
    }
    return [];
  },
};
