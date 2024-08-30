import { render } from '@testing-library/react';

import LeftSideHeader from './left-side-header';

describe('LeftSideHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeftSideHeader />);
    expect(baseElement).toBeTruthy();
  });
});
