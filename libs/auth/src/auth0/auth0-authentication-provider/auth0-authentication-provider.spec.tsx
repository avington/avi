import { render } from '@testing-library/react';

import Auth0AuthenticationProvider from './auth0-authentication-provider';

describe('Auth0AuthenticationProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auth0AuthenticationProvider />);
    expect(baseElement).toBeTruthy();
  });
});
