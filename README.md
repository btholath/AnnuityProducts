# Version-01

This include Vite ReactJs project without User front-end authentication

# Annuity Products Platform - Version 02

This project provides a full-stack web application to manage **Annuity Life Insurance Products**, built with:

- ⚙️ Node.js + Express (Back-end API)
- ⚛️ Vite + React.js (Front-end)
- 🔐 OKTA Authentication (SPA using OAuth 2.0 / OIDC)
- 🗃️ MongoDB & Redis (Data Storage and Caching)
- 🔌 WebSockets via Socket.IO for Real-Time Features

---

## 📁 Project Structure

annuity_products/
├── back-end/ # Node.js Express REST API
│ ├── src/
│ │ └── server.js
│ └── .env
└── front-end/ # React.js + Vite
├── src/
│ ├── App.jsx
│ └── main.jsx
└── .env

---

## 🌐 Backend Setup (Node.js + Express)

### Installation

```bash
cd annuity_products/back-end
npm init -y
npm install express cors dotenv mongodb redis socket.io @socket.io/redis-adapter


Environment Variables (.env)
PORT=3000
MONGO_URL=mongodb://localhost:27017/annuity
REDIS_URL=redis://localhost:6379

Start the Server
node src/server.js
Server runs at: http://localhost:3000/


# Version-02
This include Vite ReactJs project with User front-end authentication with OKTA

## Add REST API Authentication using OKTA
⚛️ Front-End Setup (React + Vite + Okta Auth)
Installation
cd annuity_products/front-end
npm create vite@latest
# Choose `React` and `JavaScript`
cd <your-project-folder>
npm install
npm install @okta/okta-auth-js @okta/okta-react react-router-dom


### High level Overview
#### 1. Create an Okta Developer Account
  Go to: https://developer.okta.com/signup/
  choose OKTA Integrator
  Sign up and verify your email.
  You’ll be given a domain like https://dev-xxxxx.okta.com.
  Onboarding URL: https://manage.auth0.com/dashboard/us/dev-exlwtvr2zaap00le/onboarding

  OKTA Integrator dashboard

#### 2. Create an Okta Application
From the dashboard, go to Applications → Create App Integration.
Choose OIDC - OpenID Connect and Single-Page Application (SPA).
    OIDC - OpenID Connect
      Token-based OAuth 2.0 authentication for Single Sign-On (SSO) through API endpoints. Recommended if you intend to build a custom app integration with the Okta Sign-In Widget.
    Single-Page Application
      Single-page web applications that run in the browser where the client receives tokens (for example, Javascript, Angular, React, Vue)

Configure:
https://trial-2428942-admin.okta.com/admin/apps/oauth2-wizard/create?applicationType=BROWSER
App integration name: AnnuityProductPortal
Grant type: Authorization Code, Refresh Token
Sign-in redirect URIs: http://localhost:5173/login/callback <--Okta sends the authentication response and ID token for the user's sign-in request to these URIs
Sign-out redirect URIs: http://localhost:5173/  <-- After your application contacts Okta to close the user session, Okta redirects the user to one of these URIs.
Save the Client ID and Issuer.


## 3.Install Okta SDK in Frontend
npm install @okta/okta-auth-js @okta/okta-react react-router-dom


Add OKTA Configuration
Update your .env file in the React app:
# Public identifier for the client that is required for all OAuth flows.
OKTA_CLIENT_ID=<Enter OKTA client id>
OKTA_APP_INTEGRATION_NAME=AnnuityProductPortal
OKTA_SIGNIN_REDIRECT_URL=http://localhost:5173/login/callback
OKTA_SIGNOUT_REDIRECT_URL=http://localhost:5173/
OKTA_DOMAIN_NAME=https://trial-2428942-admin.okta.com

Configure Okta in React
Create a file oktaConfig.js


Add OKTA Auth Code in main.jsx


#Error code and Solutions
400 Bad Request - User is not assigned to the client application.
It means that the user account you're trying to log in with is not assigned to your Okta application. This is a common setup issue in the Okta Admin Console.

Here's how to fix it:
Step 1: Log in to the Okta Admin Console
Make sure you are in Classic UI (not Developer Console, if you see both options).

Step 2: Go to Applications → Your app (e.g., tholath-trial-2428942)
Step 3: Under Assignments tab:
Click Assign → Assign to People

Select the user (your email) and click Assign

Confirm with Save and Done.
--  If you're using Okta's developer account, you're likely the only user. But if you're testing with another account, ensure that user exists and is active.

Assign to Everyone
If you're testing with multiple accounts:

In the Assignments tab, choose Assign to Groups
Assign it to Everyone


To enable Okta FastPass with Okta Verify, ensure the following are configured both in your Okta Admin Console and your React app:

✅ Step 1: Enable Okta FastPass in Admin Console
Go to: https://<your-domain>-admin.okta.com

Navigate to Security > Authenticators

Under Okta Verify, click Actions > Edit

Ensure Okta FastPass is enabled under Verification options

✅ Step 2: Ensure Device Trust is Not Blocking
FastPass requires either:

Device Trust (managed devices)

Or for unmanaged devices, FastPass without biometric restrictions.

To allow all:

Go to Security > Global Session Policies

Edit the policy.

Under "Authentication", ensure FastPass is checked and Biometric only is disabled unless you require it.

✅ Step 3: Assign the App to Your User
From earlier:

Go to Applications > AnnuityProductPortal > Assignments

Make sure biju@tholath.org is assigned.

✅ Step 4: Set Allowed Authentication Methods in App Sign-On Policy
Navigate to Security > Authentication Policies

Select the policy assigned to your app.

Make sure Okta Verify + FastPass is listed under allowed authenticators.

✅ Step 5: App Code Is Ready
From your React app’s current setup (oktaAuth.signInWithRedirect({ originalUri: '/' })), once Okta allows FastPass, users will see this option during login automatically if:

Okta Verify is set up on their device

FastPass is permitted by admin settings

No extra code changes are needed in your frontend for FastPass to show up — it's handled by Okta’s hosted login experience.

💡 Optional (for custom login UI):
If you want to embed login instead of redirecting, you'd use Okta Sign-In Widget, which supports FastPass too — but since you're using signInWithRedirect, Okta handles it via the hosted login page.



# Version-03
This include Vite ReactJs project without User front-end authentication


npm install bootstrap
npm install bootstrap-icons
npm install react-bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';

## Jest and @testing-library/react:
--  Install Testing Dependencies
(.venv) bijut@b:~/annuity_products/front-end$ npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event babel-jest


-- Configure package.json
Ensure your package.json has the test script and jest config:

--  Create Setup File
Create src/setupTests.js to enable extended assertions:

--Install jest-environment-jsdom:
npm install --save-dev jest-environment-jsdom
Ensure Your package.json Config Is Set:
npm install --save-dev babel-jest @babel/preset-env @babel/preset-react identity-obj-proxy
npm install --save-dev @types/jest

--After saving the jsconfig.json and installing types, restart VS Code or reload the window:
Ctrl+Shift+P → Reload Window

npm test
```
