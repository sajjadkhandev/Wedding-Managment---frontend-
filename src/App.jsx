import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import RealtimeChatWidget from './components/common/RealtimeChatWidget';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <RealtimeChatWidget />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
