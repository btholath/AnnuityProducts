# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


| File Name  | Location         | Purpose                                 |
| ---------- | ---------------- | --------------------------------------- |
| `index.js` | `back-end/`      | Express backend server for MongoDB CRUD |
| `App.jsx`  | `front-end/src/` | React UI to interact with backend       |


annuity_products/
├── back-end/
│   ├── index.js               # Your Express server
│   └── package.json
├── front-end/
│   ├── src/
│   │   └── App.jsx            # Your React app
│   ├── index.html
│   └── vite.config.js


Run Backend
cd annuity_products/back-end
bijut@b:~/annuity_products/back-end$ npm install
bijut@b:~/annuity_products/back-end$ node index.js
# Server runs at: http://localhost:4000



Run Frontend
cd annuity_products/front-end
npm install
npm run dev
# App runs at: http://localhost:5173

Communicate
React frontend uses axios to call http://localhost:4000/policies
Express backend connects to MongoDB and serves those API routes

