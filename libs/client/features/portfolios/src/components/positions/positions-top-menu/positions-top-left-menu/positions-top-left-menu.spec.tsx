import { render } from '@avi/client-tests';

import PositionsTopLeftMenu from './positions-top-left-menu';

describe('PositionsTopLeftMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsTopLeftMenu loading={false} portfolioId="1" portfolios={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
