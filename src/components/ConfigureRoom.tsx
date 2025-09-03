import React, { useState } from 'react';

const ConfigureRoom: React.FC = () => {
  const [formData, setFormData] = useState({
    room: '',
    welcomeMessage: '',
    supportedLanguages: '',
    defaultLanguage: 'English',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would call an API
    console.log('Saving configuration:', formData);
    // Reset form
    setFormData({
      room: '',
      welcomeMessage: '',
      supportedLanguages: '',
      defaultLanguage: 'English',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="configure-room" className="form-label">
            Select Room to Configure
          </label>
          <select
            id="configure-room"
            name="room"
            className="form-input"
            value={formData.room}
            onChange={handleInputChange}
          >
            <option value="">Select a room...</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="104">104</option>
          </select>
        </div>
        <div>
          <label className="form-label">Logo Upload</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <i className="fas fa-image fa-3x text-gray-400"></i>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="welcome-message" className="form-label">
            Welcome Message
          </label>
          <textarea
            id="welcome-message"
            name="welcomeMessage"
            rows={3}
            className="form-input"
            placeholder="e.g., Welcome {guest_name} to Hotel Aurora"
            value={formData.welcomeMessage}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="supported-languages" className="form-label">
            Supported Languages
          </label>
          <input
            type="text"
            id="supported-languages"
            name="supportedLanguages"
            className="form-input"
            placeholder="e.g., English, French, German"
            value={formData.supportedLanguages}
            onChange={handleInputChange}
          />
          <p className="text-xs text-gray-500 mt-1">Comma-separated values</p>
        </div>
        <div>
          <label htmlFor="default-language" className="form-label">
            Default Language
          </label>
          <select
            id="default-language"
            name="defaultLanguage"
            className="form-input"
            value={formData.defaultLanguage}
            onChange={handleInputChange}
          >
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
        <div className="pt-4 flex justify-end gap-4">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            <i className="fas fa-save"></i> Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigureRoom;
