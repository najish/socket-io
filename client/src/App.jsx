import './App.css';
import VideoCall from './pages/VideoCall';
import UserLayout from './layout/UserLayout';
import Dashboard from './pages/Dashboard';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatDashboard from './pages/ChatDashboard';
import { Routes, Route } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import { SocketProvider } from './context/SocketContext'; // we'll create this

function App() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ token }) => (
          <SocketProvider token={token}>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="chatpage" element={<ChatDashboard />} />
                <Route path="chatpage/:userId" element={<ChatPage />} />
                <Route path="videocall" element={<VideoCall />} />
                <Route path="*" element={<div>Page not Found</div>} />
              </Route>
            </Routes>
          </SocketProvider>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
}

export default App;
