import React, { useState } from 'react';

const AddRoom: React.FC = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    floor: '',
    macAddress: '',
    shellyId: '',
    weatherCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would call an API
    console.log('Adding room:', formData);
    // Reset form
    setFormData({
      roomNumber: '',
      floor: '',
      macAddress: '',
      shellyId: '',
      weatherCode: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="room-number" className="form-label">
            Room Number / Name
          </label>
          <input
            type="text"
            id="room-number"
            name="roomNumber"
            className="form-input"
            placeholder="e.g., 305"
            value={formData.roomNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="floor" className="form-label">
            Floor
          </label>
          <input
            type="number"
            id="floor"
            name="floor"
            className="form-input"
            placeholder="e.g., 3"
            value={formData.floor}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mac-address" className="form-label">
            MAC Address of Tablet
          </label>
          <input
            type="text"
            id="mac-address"
            name="macAddress"
            className="form-input"
            placeholder="e.g., 8C:AA:B5:32:1F:77"
            value={formData.macAddress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="shelly-id" className="form-label">
            Shelly Device ID
          </label>
          <input
            type="text"
            id="shelly-id"
            name="shellyId"
            className="form-input"
            placeholder="e.g., shelly1-ACD91A"
            value={formData.shellyId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="weather-code" className="form-label">
            Weather Location Code
          </label>
          <input
            type="text"
            id="weather-code"
            name="weatherCode"
            className="form-input"
            placeholder="e.g., Bucharest"
            value={formData.weatherCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="pt-4 flex justify-end gap-4">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            <i className="fas fa-plus"></i> Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
