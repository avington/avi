import { render } from '@avi/client-tests';

import { Lot, Position } from '@avi/global/models';
import LotStockTableRow from './lot-stock-table-row';

describe('LotStockTableRow', () => {
  it('should render successfully', () => {
    const lot: Lot = {
      id: '1',
      symbol: 'AAPL',
      shares: 100,
      price: 100,
      openDate: new Date(),
      portfolioId: '1',
      createdAt: new Date(),
      transactionType: 'BUY',
      costPerShare: 100,
    };

    const position: Position = {
      id: '1',
      symbol: 'AAPL',
      shares: 100,
      price: 100,
      portfolioId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { baseElement } = render(<LotStockTableRow lot={lot} position={position} />);
    expect(baseElement).toBeTruthy();
  });
});
