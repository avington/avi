// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DebugRouter, OuterChrome } from '@avi/client-components';
import { store } from '@avi/client-store';
import { Provider } from 'react-redux';

export function App() {
  const isProduction = process.env.VITE_PRODUCTION;

  return (
    <Provider store={store}>
      <DebugRouter isDevelopment={!isProduction}>
        <OuterChrome>
          <h1>Welcome to site!</h1>
        </OuterChrome>
      </DebugRouter>
    </Provider>
  );
}

export default App;
