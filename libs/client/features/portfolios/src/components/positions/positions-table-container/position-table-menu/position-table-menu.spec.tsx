import { render } from '@testing-library/react';

import PositionTableMenu from './position-table-menu';

describe('PositionTableMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionTableMenu />);
    expect(baseElement).toBeTruthy();
  });
});
