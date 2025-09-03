# Hotel Admin Panel

A modern React TypeScript application for managing hotel operations, including room management, guest assignments, notifications, and feedback tracking.

## Features

- **Dashboard**: Live room status monitoring with real-time statistics
- **Room Management**: Add new rooms with device configuration
- **Guest Assignment**: Assign guests to rooms with check-in/check-out dates
- **Room Configuration**: Customize room display settings and branding
- **Notifications**: Send broadcast messages to specific rooms or floors
- **Feedback Management**: View and filter guest feedback with export functionality
- **User Management**: Manage admin users with role-based access control

## Technology Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Modern ES6+** features

## Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with sidebar
│   ├── LoginScreen.tsx # Authentication screen
│   ├── Dashboard.tsx   # Main dashboard
│   ├── AddRoom.tsx     # Room addition form
│   ├── AssignGuest.tsx # Guest assignment form
│   ├── ConfigureRoom.tsx # Room configuration
│   ├── Notifications.tsx # Notification system
│   ├── Feedback.tsx    # Feedback management
│   └── Users.tsx       # User management
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage

### Authentication
- Use any email and password to log in (demo mode)
- The system will create a mock admin user

### Dashboard
- View live room status and statistics
- Quick access to main functions via action buttons

### Room Management
- Add new rooms with device information
- Configure MAC addresses and Shelly device IDs
- Set weather location codes

### Guest Assignment
- Select rooms and assign guests
- Set check-in and check-out dates
- Choose preferred language

### Configuration
- Upload custom logos
- Set welcome messages
- Configure supported languages
- Set default language preferences

### Notifications
- Send broadcast messages
- Target specific rooms or floors
- Set priority levels and timing

### Feedback
- View guest feedback with ratings
- Search and filter feedback
- Export data to CSV

### User Management
- View all system users
- Edit user information
- Delete users (with confirmation)

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by modifying:
- `src/index.css` - Global styles and custom components
- `tailwind.config.js` - Tailwind configuration

### Components
Each component is self-contained and can be easily modified:
- Form validation can be added to input components
- API integration can replace mock data
- Additional features can be added to existing components

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Static Hosting
The build folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

