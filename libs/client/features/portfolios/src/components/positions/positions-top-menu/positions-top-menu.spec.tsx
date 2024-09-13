import { render } from '@testing-library/react';

import PositionsTopMenu from './positions-top-menu';

describe('PositionsTopMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTopMenu />);
    expect(baseElement).toBeTruthy();
  });
});
