import { render } from '@avi/client-tests';

import PositionsTopMenu from './positions-top-menu';

describe('PositionsTopMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTopMenu portfolioId="1" />);
    expect(baseElement).toBeTruthy();
  });
});
