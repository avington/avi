import { render } from '@testing-library/react';

import PositionsSummary from './positions-summary';

describe('PositionsSummary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsSummary />);
    expect(baseElement).toBeTruthy();
  });
});
