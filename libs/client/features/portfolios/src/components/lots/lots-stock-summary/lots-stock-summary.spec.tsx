import { render } from '@testing-library/react';

import LotsStockSummary from './lots-stock-summary';

describe('LotsStockSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotsStockSummary />);
    expect(baseElement).toBeTruthy();
  });
});
