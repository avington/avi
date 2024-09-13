import { render } from '@testing-library/react';

import PositionsTopRightMenu from './positions-top-right-menu';

describe('PositionsTopRightMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTopRightMenu />);
    expect(baseElement).toBeTruthy();
  });
});
