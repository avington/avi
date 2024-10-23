import { Request, Response } from 'express';
import { mediator, Handler } from './mediator';

describe('mediator.publish', () => {
  beforeEach(() => {
    // Reset handlers before each test
    for (const key in mediator['handlers']) {
      delete mediator['handlers'][key];
    }
  });

  it('should call handlers with the correct payload', async () => {
    const handler: Handler = jest.fn().mockResolvedValue(undefined);
    mediator.subscribe('testEvent', handler);

    const req = {
      body: 'testPayload',
    } as unknown as Request;
    const res = {} as Response;

    await mediator.publish('testEvent', req, res);

    expect(handler).toHaveBeenCalledWith(req, res);
  });

  it('should handle asynchronous handlers', async () => {
    const handler: Handler = jest.fn().mockResolvedValue('asyncResponse');
    mediator.subscribe('testEvent', handler);

    const req = {
      body: 'testPayload',
    } as unknown as Request;
    const res = {} as Response;

    const responses = await mediator.publish('testEvent', req, res);

    expect(handler).toHaveBeenCalledWith(req, res);
    expect(responses).toEqual(['asyncResponse']);
  });

  it('should return the expected response from handlers', async () => {
    const handler: Handler = jest.fn().mockResolvedValue('expectedResponse');
    mediator.subscribe('testEvent', handler);

    const req = {
      body: 'testPayload',
    } as unknown as Request;
    const res = {} as Response;

    const responses = await mediator.publish('testEvent', req, res);

    expect(responses).toEqual(['expectedResponse']);
  });
});
