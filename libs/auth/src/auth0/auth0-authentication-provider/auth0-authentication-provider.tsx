import { PropsWithChildren } from 'react';
import styles from './auth0-authentication-provider.module.scss';
import { Auth0Provider } from '@auth0/auth0-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Auth0AuthenticationProviderProps {}

export function Auth0AuthenticationProvider({
  children,
}: PropsWithChildren<Auth0AuthenticationProviderProps>) {
  return (
    <Auth0Provider
      domain="i-avington.auth0.com"
      clientId="xoj8epASneETvJRvZ03hwdbBieuPNept"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0AuthenticationProvider;
