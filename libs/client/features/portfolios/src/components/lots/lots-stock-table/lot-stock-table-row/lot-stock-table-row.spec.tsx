import { render } from '@testing-library/react';

import LotStockTableRow from './lot-stock-table-row';

describe('LotStockTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotStockTableRow />);
    expect(baseElement).toBeTruthy();
  });
});
