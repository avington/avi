import { render } from '@avi/client-tests';

import PositionsView from './positions-view';

describe('PositionsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionsView />);
    expect(baseElement).toBeTruthy();
  });
});
