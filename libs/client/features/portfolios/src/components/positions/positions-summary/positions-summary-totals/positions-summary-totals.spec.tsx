import { render } from '@testing-library/react';

import PositionsSummaryTotals from './positions-summary-totals';

describe('PositionsSummaryTotals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsSummaryTotals />);
    expect(baseElement).toBeTruthy();
  });
});
