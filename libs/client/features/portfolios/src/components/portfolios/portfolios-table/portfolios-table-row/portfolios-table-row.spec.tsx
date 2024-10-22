import { render } from '@avi/client-tests';

import PortfoliosTableRow from './portfolios-table-row';
import { Portfolio } from '@avi/global/models';

describe('PortfoliosTableRow', () => {
  it('should render successfully', () => {
    const portfolio: Portfolio = {
      id: '1',
      name: 'Test Portfolio',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: '1',
    };

    const { baseElement } = render(<PortfoliosTableRow portfolio={portfolio} />);
    expect(baseElement).toBeTruthy();
  });
});
