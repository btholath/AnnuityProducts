// App.jsx
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import AppContent from './AppContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;