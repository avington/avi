import { render } from '@avi/client-tests';

import LotStockTableBody from './lot-stock-table-body';

describe('LotStockTableBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotStockTableBody />);
    expect(baseElement).toBeTruthy();
  });
});
