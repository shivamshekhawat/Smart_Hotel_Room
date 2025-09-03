import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import RoomsManagement from './components/RoomsManagement';
import GuestManagement from './components/GuestManagement';
import Notifications from './components/Notifications';
import Feedback from './components/Feedback';
import Settings from './components/Settings';
import Calendar from './components/Calendar';
import Layout from './components/Layout';
import ConfigureDisplay from './components/ConfigureDisplay';
import Users from './components/Users';
import CleanRequests from './components/CleanRequests';
import TechnicalIssues from './components/TechnicalIssues';

export interface User {
  username: string;
  email: string;
  role: string;
  accessScope: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  guestName: string;
  mode: string;
  lastAction: string;
  tabletStatus: string;
  macAddress: string;
  shellyId: string;
  weatherCode: string;
}

export interface FeedbackItem {
  id: string;
  room: string;
  guestName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<RoomsManagement />} />
          <Route path="/guests" element={<GuestManagement />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/configure-display" element={<ConfigureDisplay />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/users" element={<Users />} />
          <Route path="/clean-requests" element={<CleanRequests />} />
          <Route path="/technical-issues" element={<TechnicalIssues />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
