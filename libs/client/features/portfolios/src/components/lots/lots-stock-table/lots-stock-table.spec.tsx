import { render } from '@avi/client-tests';

import LotsStockTable from './lots-stock-table';

describe('LotsStockTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotsStockTable />);
    expect(baseElement).toBeTruthy();
  });
});
