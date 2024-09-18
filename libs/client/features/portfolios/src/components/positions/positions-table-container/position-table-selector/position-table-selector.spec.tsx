import { render } from '@testing-library/react';

import PositionTableSelector from './position-table-selector';

describe('PositionTableSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionTableSelector />);
    expect(baseElement).toBeTruthy();
  });
});
