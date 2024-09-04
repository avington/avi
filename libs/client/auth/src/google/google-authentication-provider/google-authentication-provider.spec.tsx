import { render } from '@testing-library/react';

import GoogleAuthenticationProvider from './google-authentication-provider';

describe('GoogleAuthenticationProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoogleAuthenticationProvider />);
    expect(baseElement).toBeTruthy();
  });
});
