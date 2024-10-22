import { render } from '@avi/client-tests';

import HoldingsTableRow from './holdings-table-row';

describe('HoldingsTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <HoldingsTableRow
        position={{
          id: '1111',
          symbol: 'AAA',
          createdAt: new Date('1/1/2024'),
          portfolioId: '1234',
          updatedAt: new Date(),
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
