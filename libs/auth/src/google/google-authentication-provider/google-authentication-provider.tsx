import { GoogleOAuthProvider } from '@react-oauth/google';
import { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GoogleAuthenticationProviderProps {}

export function GoogleAuthenticationProvider({
  children,
}: PropsWithChildren<GoogleAuthenticationProviderProps>) {
  return (
    <GoogleOAuthProvider
      clientId={
        '777076037833-a99gl42hupo9afa856h7sfuglqm11e9i.apps.googleusercontent.com'
      }
      onScriptLoadError={() => console.log('Script Load Error')}
    >
      {children}
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthenticationProvider;
