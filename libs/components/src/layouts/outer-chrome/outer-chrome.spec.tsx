import { render } from '@testing-library/react';

import OuterChrome from './outer-chrome';

describe('OuterChrome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OuterChrome />);
    expect(baseElement).toBeTruthy();
  });
});
