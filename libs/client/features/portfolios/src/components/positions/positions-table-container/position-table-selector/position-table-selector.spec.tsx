import { render } from '@avi/client-tests';

import PositionTableSelector from './position-table-selector';

describe('PositionTableSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionTableSelector />);
    expect(baseElement).toBeTruthy();
  });
});
