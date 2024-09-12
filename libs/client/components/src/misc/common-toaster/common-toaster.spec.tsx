import { render } from '@testing-library/react';

import CommonToaster from './common-toaster';

describe('CommonToaster', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonToaster />);
    expect(baseElement).toBeTruthy();
  });
});
