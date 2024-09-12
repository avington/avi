import { render } from '@testing-library/react';

import ToastIcon from './toast-icon';

describe('ToastIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToastIcon />);
    expect(baseElement).toBeTruthy();
  });
});
