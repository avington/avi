import { render } from '@avi/client-tests';

import PortfoliosSummary from './portfolios-summary';

describe('PortfoliosSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosSummary />);
    expect(baseElement).toBeTruthy();
  });
});
