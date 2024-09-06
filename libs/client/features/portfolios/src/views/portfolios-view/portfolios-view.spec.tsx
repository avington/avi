import { render } from '@testing-library/react';

import PortfoliosView from './portfolios-view';

describe('PortfoliosView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PortfoliosView />);
    expect(baseElement).toBeTruthy();
  });
});
