import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
