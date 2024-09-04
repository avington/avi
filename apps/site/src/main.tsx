import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { Auth0AuthenticationProvider, GoogleAuthenticationProvider } from '@avi/client-auth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Auth0AuthenticationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0AuthenticationProvider>
);
