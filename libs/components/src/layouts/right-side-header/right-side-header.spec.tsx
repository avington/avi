import { render } from '@testing-library/react';

import RightSideHeader from './right-side-header';

describe('RightSideHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RightSideHeader />);
    expect(baseElement).toBeTruthy();
  });
});
