import { serverHoldings } from './server-holdings';

describe('serverHoldings', () => {
  it('should work', () => {
    expect(serverHoldings()).toEqual('server-holdings');
  });
});
