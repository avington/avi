import { render } from '@avi/client-tests';

import LotsStockSummary from './lots-stock-summary';

describe('LotsStockSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotsStockSummary />);
    expect(baseElement).toBeTruthy();
  });
});
