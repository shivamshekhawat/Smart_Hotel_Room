import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

// ✅ Wrap app so we can use hooks like useNavigate
const AppWrapper = () => (
  <ThemeProvider>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUser = localStorage.getItem('currentUser');
        
        if (storedAuth === 'true' && storedUser) {
          setCurrentUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Prevent logout via browser shortcuts and context menu
  useEffect(() => {
    const preventLogout = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'q') || 
          (e.altKey && e.key === 'F4') || 
          (e.ctrlKey && e.key === 'w')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const originalClose = window.close;
    window.close = () => {
      console.log('Window close prevented for security');
      return false;
    };

    const preventUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const preventDevTools = (e: KeyboardEvent) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const disableRightClick = (e: MouseEvent) => {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', preventLogout);
    document.addEventListener('keydown', preventDevTools);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('mousedown', disableRightClick);
    window.addEventListener('beforeunload', preventUnload);

    return () => {
      document.removeEventListener('keydown', preventLogout);
      document.removeEventListener('keydown', preventDevTools);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('mousedown', disableRightClick);
      window.removeEventListener('beforeunload', preventUnload);
      window.close = originalClose;
    };
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    // ✅ Navigate without reload
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    navigate('/login', { replace: true });
  };

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

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )
        }
      />

      {/* Root path */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route
          element={<Layout currentUser={currentUser} onLogout={handleLogout} />}
        >
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
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

export default AppWrapper;
