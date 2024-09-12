import { render } from '@testing-library/react';

import PortfoliosTableBody from './portfolios-table-body';

describe('PortfoliosTableBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosTableBody />);
    expect(baseElement).toBeTruthy();
  });
});
