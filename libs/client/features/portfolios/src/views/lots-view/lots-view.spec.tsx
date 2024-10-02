import { render } from '@testing-library/react';

import LotsView from './lots-view';

describe('LotsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LotsView />);
    expect(baseElement).toBeTruthy();
  });
});
