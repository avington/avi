import { render } from '@testing-library/react';

import HoldingsTableHeader from './holdings-table-header';

describe('HoldingsTableHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTableHeader />);
    expect(baseElement).toBeTruthy();
  });
});
