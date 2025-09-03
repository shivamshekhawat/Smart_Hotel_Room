import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Save } from 'lucide-react';

const ConfigureDisplay = () => {
  const [logo, setLogo] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [supportedLanguages, setSupportedLanguages] = useState(['English', 'French', 'German']);
  const [defaultLanguage, setDefaultLanguage] = useState('English');

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Page Header */}
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Configure Display</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Branding and language preferences for in-room tablets</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
      <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium">Logo Upload</label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setLogoFile(e.target.files[0]);
                  setLogo(e.target.files[0].name);
                }
              }}
            />
            {logo && (
              <div className="mt-2 text-xs text-gray-500">Selected: {logo}</div>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Welcome Message</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              placeholder="e.g., Welcome Mr. Doe to Hotel Aurora"
              value={welcomeMessage}
              onChange={e => setWelcomeMessage(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Supported Languages</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              placeholder="e.g., English, French, German"
              value={supportedLanguages.join(', ')}
              onChange={e => setSupportedLanguages(e.target.value.split(',').map(l => l.trim()))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Default Language</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              value={defaultLanguage}
              onChange={e => setDefaultLanguage(e.target.value)}
            >
              {supportedLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={() => {
            // Save logic here (could be API call)
            const event = new CustomEvent('showToast', {
              detail: { type: 'success', title: 'Room Display Updated', message: 'Room display settings saved successfully!' }
            });
            window.dispatchEvent(event);
          }}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Display Settings
        </Button>
      </CardContent>
    </Card>
    </div>
    </div>
  );
};

export default ConfigureDisplay;
