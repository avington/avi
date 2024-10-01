import { render } from '@testing-library/react';

import HoldingsTransactionMenu from './holdings-transaction-menu';

describe('HoldingsTransactionMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTransactionMenu />);
    expect(baseElement).toBeTruthy();
  });
});
