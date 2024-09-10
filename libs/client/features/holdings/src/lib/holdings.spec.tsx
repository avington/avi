import { render } from '@avi/client-tests';

import Holdings from './holdings';
import { BrowserRouter } from 'react-router-dom';

describe('Holdings', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Holdings />);
    expect(baseElement).toBeTruthy();
  });
});
