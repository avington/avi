import { Auth0Provider } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Auth0AuthenticationProviderProps {}

export function Auth0AuthenticationProvider({ children }: PropsWithChildren<Auth0AuthenticationProviderProps>) {
  const authProps = { domain: import.meta.env.VITE_AUTH0_DOMAIN, clientId: import.meta.env.VITE_AUTH0_CLIENT_ID };
  console.log('authProps', authProps);
  return (
    <Auth0Provider
      {...authProps}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0AuthenticationProvider;
