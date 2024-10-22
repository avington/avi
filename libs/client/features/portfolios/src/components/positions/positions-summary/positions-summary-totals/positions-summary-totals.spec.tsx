import { render } from '@avi/client-tests';

import PositionsSummaryTotals from './positions-summary-totals';

describe('PositionsSummaryTotals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsSummaryTotals />);
    expect(baseElement).toBeTruthy();
  });
});
