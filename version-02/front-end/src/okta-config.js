// src/okta-config.js

const oktaConfig = {
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  redirectUri: import.meta.env.VITE_OKTA_SIGNIN_REDIRECT_URL,
  postLogoutRedirectUri: import.meta.env.VITE_OKTA_SIGNOUT_REDIRECT_URL,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

export default oktaConfig;
