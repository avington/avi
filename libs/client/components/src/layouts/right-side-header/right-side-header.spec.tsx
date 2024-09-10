import { render } from '@avi/client-tests';

import RightSideHeader from './right-side-header';

describe('RightSideHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RightSideHeader />);
    expect(baseElement).toBeTruthy();
  });
});
