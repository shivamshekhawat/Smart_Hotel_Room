import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Toast from './ui/toast';
import { useTheme } from '../lib/ThemeContext';
import {
  LayoutDashboard,
  Bed,
  Users,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  onLogout: () => void;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    const handleToastEvent = (event: CustomEvent) => {
      addToast(event.detail);
    };
    const handleLogoutRequest = () => {
      onLogout();
      addToast({ type: 'success', title: 'Logged Out', message: 'You have been successfully logged out' });
    };
    window.addEventListener('showToast', handleToastEvent as EventListener);
    window.addEventListener('requestLogout', handleLogoutRequest as EventListener);
    return () => {
      window.removeEventListener('showToast', handleToastEvent as EventListener);
      window.removeEventListener('requestLogout', handleLogoutRequest as EventListener);
    };
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Rooms Management', href: '/rooms', icon: Bed },
    { name: 'Guest Management', href: '/guests', icon: Users },
    { name: 'Configure Display', href: '/configure-display', icon: Settings },
    { name: 'User Management', href: '/users', icon: UserIcon },
    { name: 'Feedback & Reviews', href: '/feedback', icon: MessageSquare },
    // { name: 'Settings', href: '/settings', icon: Settings },
  ];

  // Sidebar width for layout shift
  const sidebarWidth = sidebarCollapsed ? 72 : 260; // px

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex bg-gradient-to-br from-sky-100 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-black`}
      style={{ minHeight: '100vh' }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-blue-100 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ width: sidebarWidth, minWidth: sidebarWidth }}
      >
        {/* Logo and Admin Panel Heading */}
        <div className="flex flex-col items-center pt-8 pb-4 px-4 border-b border-blue-100 dark:border-gray-800">
          <div className="flex items-center justify-center w-full">
            <img
              src="/image/hyatt-regency-seeklogo 1.png"
              alt="Hotel Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          {!sidebarCollapsed && (
            <span className="mt-4 mb-2 block text-lg font-bold text-blue-700 dark:text-blue-200 tracking-wide text-center uppercase">
              Admin Panel
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="hidden md:flex h-8 w-8 mt-2 rounded-full text-blue-500 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-slate-800 absolute top-4 right-4"
            aria-label="Toggle sidebar width"
            style={{ position: 'absolute', top: 18, right: 18 }}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-colors duration-200 group ${
                  isActive
                    ? 'bg-sky-100 text-sky-700 dark:bg-slate-800 dark:text-sky-200 shadow font-semibold'
                    : 'text-blue-900 dark:text-blue-100 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-200'
                }`}
                style={{ marginBottom: 2 }}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-blue-400 dark:text-blue-300 group-hover:text-sky-600 dark:group-hover:text-sky-400'}`} />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Divider and Settings Section */}
        <div className="px-4 pb-6">
          <div className="border-t border-blue-100 dark:border-gray-800 mb-4"></div>
          <Link
            to="/settings"
            className={`flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-colors duration-200 mb-2 ${
              location.pathname === '/settings'
                ? 'bg-sky-100 text-sky-700 dark:bg-slate-800 dark:text-sky-200 shadow font-semibold'
                : 'text-blue-900 dark:text-blue-100 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-200'
            }`}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Settings className={`h-5 w-5 flex-shrink-0 ${location.pathname === '/settings' ? 'text-sky-600 dark:text-sky-400' : 'text-blue-400 dark:text-blue-300 group-hover:text-sky-600 dark:group-hover:text-sky-400'}`} />
            {!sidebarCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMobileNavOpen(false)} />
      )}

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300 md:ml-[var(--sidebar-width)]"
        style={{ ['--sidebar-width' as any]: `${sidebarWidth}px` }}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-blue-100 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4 shadow-md">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open navigation"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              </Button>
              <h1 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                {navigation.find((item) => item.href === location.pathname)?.name ||
                  'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 rounded-full hover:bg-sky-100 dark:hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-sky-500" />
                )}
              </Button>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-screen-xl mx-auto bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8 min-h-[70vh] border border-blue-100 dark:border-gray-800">
            {children}
          </div>
        </main>
      </div>
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default Layout;
