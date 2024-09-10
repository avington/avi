import { render } from '@avi/client-tests';

import LeftSideHeader from './left-side-header';

describe('LeftSideHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeftSideHeader />);
    expect(baseElement).toBeTruthy();
  });
});
