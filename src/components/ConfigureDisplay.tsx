import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Save, X } from 'lucide-react';

const ConfigureDisplay = () => {
  const [logo, setLogo] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [supportedLanguages, setSupportedLanguages] = useState(['English', 'Romanian']);
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [languageInput, setLanguageInput] = useState('');

  // ✅ Keep defaultLanguage valid
  useEffect(() => {
    if (!supportedLanguages.includes(defaultLanguage)) {
      setDefaultLanguage(supportedLanguages[0] || '');
    }
  }, [supportedLanguages, defaultLanguage]);

  const handleAddLanguage = () => {
    const val = languageInput.trim();
    if (val && !supportedLanguages.includes(val)) {
      setSupportedLanguages([...supportedLanguages, val]);
    }
    setLanguageInput('');
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="mx-auto w-full max-w-5xl">
        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="space-y-6 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Logo Upload */}
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

              {/* Welcome Message */}
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

              {/* Supported Languages */}
              <div>
                <label className="text-sm font-medium">Supported Languages</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {supportedLanguages.map((lang) => (
                    <span
                      key={lang}
                      className="flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {lang}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          setSupportedLanguages(supportedLanguages.filter(l => l !== lang))
                        }
                      />
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 border rounded-md bg-background"
                  placeholder="Type language and press Space or Comma"
                  value={languageInput}
                  onChange={e => setLanguageInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === ' ' || e.key === ',') {
                      e.preventDefault();
                      handleAddLanguage();
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddLanguage();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setSupportedLanguages([])}
                >
                  <X className="h-4 w-4 mr-1" /> Clear All
                </Button>
              </div>

              {/* Default Language */}
              <div>
                <label className="text-sm font-medium">Default Language</label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                  value={defaultLanguage}
                  onChange={e => setDefaultLanguage(e.target.value)}
                >
                  {supportedLanguages.length > 0 ? (
                    supportedLanguages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))
                  ) : (
                    <option value="">No languages available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={() => {
                const event = new CustomEvent('showToast', {
                  detail: { 
                    type: 'success', 
                    title: 'Room Display Updated', 
                    message: 'Room display settings saved successfully!' 
                  }
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
