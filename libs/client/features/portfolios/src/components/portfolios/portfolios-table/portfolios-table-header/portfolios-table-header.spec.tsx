import { render } from '@testing-library/react';

import PortfoliosTableHeader from './portfolios-table-header';

describe('PortfoliosTableHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosTableHeader />);
    expect(baseElement).toBeTruthy();
  });
});
