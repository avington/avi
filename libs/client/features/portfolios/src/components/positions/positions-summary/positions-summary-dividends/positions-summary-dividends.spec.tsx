import { render } from '@testing-library/react';

import PositionsSummaryDividends from './positions-summary-dividends';

describe('PositionsSummaryDividends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsSummaryDividends />);
    expect(baseElement).toBeTruthy();
  });
});
