import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Save, X } from 'lucide-react';

const allowedLanguages = [
  'English','Romanian','French','German','Spanish','Italian','Hindi','Chinese','Japanese','Arabic'
];

const ConfigureDisplay = () => {
  const [logo, setLogo] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [roomNumber, setRoomNumber] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [supportedLanguages, setSupportedLanguages] = useState(['English', 'Romanian']);
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [languageInput, setLanguageInput] = useState('');

  useEffect(() => {
    if (!supportedLanguages.includes(defaultLanguage)) {
      setDefaultLanguage(supportedLanguages[0] || '');
    }
  }, [supportedLanguages, defaultLanguage]);

  const handleAddLanguage = () => {
    const val = languageInput.trim();
    if (val && allowedLanguages.includes(val) && !supportedLanguages.includes(val)) {
      setSupportedLanguages([...supportedLanguages, val]);
    }
    setLanguageInput('');
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    const file = files[0];

    if (validTypes.includes(file.type)) {
      setLogoFile(file);
      setLogo(file.name);
    } else {
      alert("Only image files (PNG, JPG, JPEG, GIF) are allowed.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Logo Upload */}
        <Card className="p-4 sm:p-6">
          <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Logo Upload</label>
              <div
                className={`flex items-center justify-center border-2 border-dashed rounded-md h-24 cursor-pointer transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-background"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => document.getElementById("logo-input")?.click()}
              >
                <p className="text-gray-500 text-center text-sm">
                  Drag & drop an image here, or click to browse
                </p>
              </div>
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              {logo && <span className="mt-2 text-xs text-gray-500 block">{logo}</span>}
            </div>
          </CardContent>
        </Card>

        {/* Room Info */}
        <Card className="p-4 sm:p-6">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Room Number</label>
              <input
                type="text"
                placeholder="e.g., 101"
                className="border rounded-md px-3 py-2 bg-background focus:ring-1 focus:ring-blue-400 outline-none"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Welcome Message</label>
              <input
                type="text"
                placeholder="Welcome Mr. Doe to Hotel Aurora"
                className="border rounded-md px-3 py-2 bg-background focus:ring-1 focus:ring-blue-400 outline-none"
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Supported Languages */}
        <Card className="p-4 sm:p-6">
          <CardContent className="flex flex-col gap-4">
            <label className="text-sm font-medium">Supported Languages</label>
            <div className="flex flex-wrap gap-2">
              {supportedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                >
                  {lang}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSupportedLanguages(supportedLanguages.filter(l => l !== lang))}
                  />
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type language and press Enter / Space / Comma"
              className="border rounded-md px-3 py-2 bg-background focus:ring-1 focus:ring-blue-400 outline-none"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              onKeyDown={(e) => { if ([' ', ',', 'Enter'].includes(e.key)) { e.preventDefault(); handleAddLanguage(); } }}
            />
            <Button
              type="button"
              variant="outline"
              className="w-max flex items-center gap-1 mt-2"
              onClick={() => setSupportedLanguages([])}
            >
              <X className="h-4 w-4" /> Clear All
            </Button>

            {/* Default Language */}
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium mb-1">Default Language</label>
              <select
                className="border rounded-md px-3 py-2 bg-background focus:ring-1 focus:ring-blue-400 outline-none"
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
              >
                {supportedLanguages.length > 0 ? (
                  supportedLanguages.map((lang) => <option key={lang} value={lang}>{lang}</option>)
                ) : (
                  <option value="">No languages available</option>
                )}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-start">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => {
              if (!roomNumber || !welcomeMessage) {
                alert("Please enter both Room Number and Welcome Message");
                return;
              }
              const event = new CustomEvent('showToast', {
                detail: { 
                  type: 'success', 
                  title: `Room ${roomNumber} Message Updated`, 
                  message: `Message for Room ${roomNumber} saved successfully!` 
                }
              });
              window.dispatchEvent(event);
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Display Settings
          </Button>
        </div>

      </div>
    </div>
  );
};

export default ConfigureDisplay;
