import { render } from '@testing-library/react';

import PositionsSummaryEarnings from './positions-summary-earnings';

describe('PositionsSummaryEarnings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsSummaryEarnings />);
    expect(baseElement).toBeTruthy();
  });
});
