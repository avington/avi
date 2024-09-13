import { render } from '@testing-library/react';

import PositionsTopLeftMenu from './positions-top-left-menu';

describe('PositionsTopLeftMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTopLeftMenu />);
    expect(baseElement).toBeTruthy();
  });
});
