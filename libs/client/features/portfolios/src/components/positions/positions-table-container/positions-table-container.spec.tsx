import { render } from '@testing-library/react';

import PositionsTableContainer from './positions-table-container';

describe('PositionsTableContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTableContainer />);
    expect(baseElement).toBeTruthy();
  });
});
