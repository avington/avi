import { render } from '@avi/client-tests';

import HoldingsTable from './holdings-table';

describe('HoldingsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTable />);
    expect(baseElement).toBeTruthy();
  });
});
