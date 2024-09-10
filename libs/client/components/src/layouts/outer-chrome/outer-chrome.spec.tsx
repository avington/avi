import { render } from '@avi/client-tests';

import OuterChrome from './outer-chrome';

describe('OuterChrome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OuterChrome />);
    expect(baseElement).toBeTruthy();
  });
});
