import { render } from '@testing-library/react';

import HoldingsTableRow from './holdings-table-row';

describe('HoldingsTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTableRow />);
    expect(baseElement).toBeTruthy();
  });
});
