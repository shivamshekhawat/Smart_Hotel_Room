import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Save, 
  User, 
  Palette,
  LogOut as LogOutIcon
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@hotel.com',
      phone: '+1 (555) 123-4567',
      role: 'Administrator'
    },
    appearance: {
      theme: 'light',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [key]: value
      }
    }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, (settings as any)[section]);
  };

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    applyTheme(settings.appearance.theme);
  }, []);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'appearance', name: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">Manage your account and preferences</p>
        </div>
        <Button
          variant="destructive"
          className="gap-2"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('requestLogout'));
          }}
        >
          <LogOutIcon className="h-4 w-4" /> Logout
        </Button>
      </div>

      <div className="flex space-x-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 rounded-xl border border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
            <CardDescription className="text-base">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={settings.profile.firstName}
                  onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={settings.profile.lastName}
                  onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  value={settings.profile.phone}
                  onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                />
              </div>
            </div>
            <Button 
              onClick={() => {
                handleSave('profile');
                const event = new CustomEvent('showToast', {
                  detail: { type: 'success', title: 'Profile Updated', message: 'Profile information saved successfully!' }
                });
                window.dispatchEvent(event);
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'appearance' && (
        <Card>
          <CardHeader>
            <CardTitle>Appearance & Display</CardTitle>
            <CardDescription>Choose your theme preference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <select
                  value={settings.appearance.theme}
                  onChange={(e) => {
                    handleSettingChange('appearance', 'theme', e.target.value);
                    applyTheme(e.target.value);
                  }}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
            <Button 
              onClick={() => {
                handleSave('appearance');
                const event = new CustomEvent('showToast', {
                  detail: { type: 'success', title: 'Appearance Updated', message: 'Theme preference saved!' }
                });
                window.dispatchEvent(event);
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Appearance Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Settings;
