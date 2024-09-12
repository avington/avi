import { render } from '@testing-library/react';

import PortfoliosTableRow from './portfolios-table-row';

describe('PortfoliosTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosTableRow />);
    expect(baseElement).toBeTruthy();
  });
});
