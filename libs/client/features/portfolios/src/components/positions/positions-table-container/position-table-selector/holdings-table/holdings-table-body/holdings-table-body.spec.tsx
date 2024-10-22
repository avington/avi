import { render } from '@avi/client-tests';

import HoldingsTableBody from './holdings-table-body';

describe('HoldingsTableBody', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HoldingsTableBody />);
    expect(baseElement).toBeTruthy();
  });
});
