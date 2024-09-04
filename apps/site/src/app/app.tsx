// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DebugRouter, OuterChrome } from '@avi/shared/components';
import styles from './app.module.scss';
import { Provider } from 'react-redux';
import { store } from '@avi/shared/store';
import { useAuth0 } from '@auth0/auth0-react';

export function App() {
  const isProduction = process.env.VITE_PRODUCTION;
  const x = import.meta.env;
  console.log('x', x);
  const authProps = { domain: import.meta.env.VITE_AUTH0_DOMAIN, clientId: import.meta.env.VITE_AUTH0_CLIENT_ID };
  console.log('authProps', authProps);
  console.log('isProduction', isProduction);
  const { getAccessTokenSilently } = useAuth0();

  const handleClick = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: 'https://avi-digital-garden-api', prompt: 'consent' },
      });
      console.log('Token:', token);
      const response = await fetch('http://localhost:3333/api/secure', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Provider store={store}>
      <DebugRouter isDevelopment={!isProduction}>
        <OuterChrome>
          <h1>Welcome to site!</h1>
          <button onClick={handleClick}>Click me</button>
        </OuterChrome>
      </DebugRouter>
    </Provider>
  );
}

export default App;
