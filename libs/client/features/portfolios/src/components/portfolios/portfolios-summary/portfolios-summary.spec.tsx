import { render } from '@testing-library/react';

import PortfoliosSummary from './portfolios-summary';

describe('PortfoliosSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosSummary />);
    expect(baseElement).toBeTruthy();
  });
});
