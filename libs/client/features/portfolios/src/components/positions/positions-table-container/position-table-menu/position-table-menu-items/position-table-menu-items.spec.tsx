import { render } from '@testing-library/react';

import PositionTableMenuItems from './position-table-menu-items';

describe('PositionTableMenuItems', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionTableMenuItems />);
    expect(baseElement).toBeTruthy();
  });
});
