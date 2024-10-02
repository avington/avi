import { render } from '@testing-library/react';

import LotsStockActionRow from './lots-stock-action-row';

describe('LotsStockActionRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotsStockActionRow />);
    expect(baseElement).toBeTruthy();
  });
});
