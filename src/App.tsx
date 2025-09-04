import { useState, useEffect } from 'react';
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
import { ThemeProvider } from './lib/ThemeContext';

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
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('currentUser');
        
        if (storedAuth === 'true' && storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    // Persist to localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    // Clear from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
