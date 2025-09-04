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

// ✅ ProtectedRoute
const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// ✅ AppWrapper
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

  // Check for stored auth info
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('currentUser');
    if (storedAuth === 'true' && storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
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
      {/* Public Login Route */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen onLogin={handleLogin} />}
      />

      {/* Root "/" route always goes to login if unauthenticated */}
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />

      {/* Protected Routes wrapped with Layout */}
      <Route
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout currentUser={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
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
      </Route>

      {/* Catch-all: redirect unauthenticated users to login */}
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
};


export default AppWrapper;
