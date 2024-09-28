import { render } from '@testing-library/react';

import HoldingsTableBody from './holdings-table-body';

describe('HoldingsTableBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTableBody />);
    expect(baseElement).toBeTruthy();
  });
});
