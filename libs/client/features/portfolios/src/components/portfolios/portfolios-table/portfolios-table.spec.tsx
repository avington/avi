import { render } from '@testing-library/react';

import PortfolioTable from './portfolios-table';

describe('PortfolioTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfolioTable loading={false} portfolios={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
