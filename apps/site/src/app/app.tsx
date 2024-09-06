// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DebugRouter, OuterChrome } from '@avi/client-components';
import { store } from '@avi/client-store';
import { getHomeRoutes } from '@avi/client/features/home';
import { getPortfoliosRoutes } from '@avi/client/features/portfolios';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Routes } from 'react-router-dom';

export function App() {
  const isProduction = process.env.VITE_PRODUCTION;
  const routes = [...getHomeRoutes(), getPortfoliosRoutes()];

  return (
    <Provider store={store}>
      <DebugRouter isDevelopment={!isProduction}>
        <OuterChrome>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>{routes}</Routes>
          </Suspense>
        </OuterChrome>
      </DebugRouter>
    </Provider>
  );
}

export default App;
