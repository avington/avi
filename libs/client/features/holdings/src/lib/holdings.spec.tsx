import { render } from '@testing-library/react';

import Holdings from './holdings';

describe('Holdings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Holdings />);
    expect(baseElement).toBeTruthy();
  });
});
