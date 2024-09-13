import { render } from '@testing-library/react';

import PositionsView from './positions-view';

describe('PositionsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsView />);
    expect(baseElement).toBeTruthy();
  });
});
