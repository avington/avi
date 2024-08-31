import { render } from '@testing-library/react';

import Auth0AuthButton from './auth0-auth-button';

describe('Auth0AuthButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auth0AuthButton />);
    expect(baseElement).toBeTruthy();
  });
});
