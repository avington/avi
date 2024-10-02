import { render } from '@testing-library/react';

import LotStockTableHeader from './lot-stock-table-header';

describe('LotStockTableHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotStockTableHeader />);
    expect(baseElement).toBeTruthy();
  });
});
