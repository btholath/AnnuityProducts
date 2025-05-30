import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './okta-config';
import App from './App';

const oktaAuth = new OktaAuth(oktaConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Security oktaAuth={oktaAuth} restoreOriginalUri={async (_oktaAuth, originalUri) => {
      window.location.replace(originalUri || '/');
    }}>
      <App />
    </Security>
  </StrictMode>
);
