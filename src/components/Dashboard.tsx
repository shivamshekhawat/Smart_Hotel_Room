import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Users,
  Bed,
  Bell,
  Calendar,
  Clock,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for guests
  const guests = [
    {
      id: 1,
      name: "John Doe",
      room: "101",
      checkIn: "2023-05-15",
      checkOut: "2023-05-20",
      status: "checked-in",
    },
    {
      id: 2,
      name: "Jane Smith",
      room: "205",
      checkIn: "2023-05-16",
      checkOut: "2023-05-18",
      status: "checked-in",
    },
    {
      id: 3,
      name: "Robert Johnson",
      room: "312",
      checkIn: "2023-05-17",
      checkOut: "2023-05-19",
      status: "checked-out",
    },
    {
      id: 4,
      name: "Emily Davis",
      room: "104",
      checkIn: "2023-05-18",
      checkOut: "2023-05-22",
      status: "checked-in",
    },
    {
      id: 5,
      name: "Michael Brown",
      room: "201",
      checkIn: "2023-05-19",
      checkOut: "2023-05-21",
      status: "checked-in",
    },
  ];

  // Mock data for rooms
  const rooms = [
    { number: 101, status: 'available', type: 'Deluxe' },
    { number: 102, status: 'occupied', type: 'Standard' },
    { number: 103, status: 'available', type: 'Suite' },
    { number: 104, status: 'maintenance', type: 'Presidential' },
    { number: 105, status: 'available', type: 'Standard' },
    { number: 106, status: 'occupied', type: 'Deluxe' },
    { number: 107, status: 'available', type: 'Suite' },
    { number: 108, status: 'available', type: 'Standard' },
    { number: 109, status: 'occupied', type: 'Presidential' },
    { number: 110, status: 'available', type: 'Deluxe' },
    { number: 201, status: 'maintenance', type: 'Standard' },
    { number: 202, status: 'available', type: 'Suite' },
    { number: 203, status: 'occupied', type: 'Deluxe' },
    { number: 204, status: 'available', type: 'Standard' },
    { number: 205, status: 'occupied', type: 'Presidential' },
    { number: 206, status: 'available', type: 'Deluxe' },
    { number: 207, status: 'maintenance', type: 'Standard' },
    { number: 208, status: 'available', type: 'Suite' },
    { number: 209, status: 'occupied', type: 'Deluxe' },
    { number: 210, status: 'available', type: 'Standard' },
    { number: 301, status: 'available', type: 'Presidential' },
    { number: 302, status: 'occupied', type: 'Deluxe' },
    { number: 303, status: 'available', type: 'Standard' },
    { number: 304, status: 'maintenance', type: 'Suite' },
    { number: 305, status: 'available', type: 'Deluxe' },
  ];

  const notifications = [
    {
      id: 1,
      type: "checkin",
      message: "New guest checked in to Room 205",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "maintenance",
      message: "Maintenance request for Room 312",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "checkout",
      message: "Guest checked out from Room 108",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "review",
      message: "New 5-star review received",
      time: "2 hours ago",
    },
  ];

  // Live Room Status mock data
  const liveRoomStatus = [
    { room: '101', guest: 'Guest', mode: 'Idle', lastAction: '', tabletStatus: 'Online' },
    { room: '102', guest: 'Jane Smith', mode: 'Do Not Disturb', lastAction: '11:10 AM', tabletStatus: 'Online' },
    { room: '103', guest: 'John Doe', mode: 'Cleaning', lastAction: '', tabletStatus: 'Offline' },
    { room: '104', guest: 'Guest', mode: 'Idle', lastAction: '', tabletStatus: 'Online' },
    { room: '105', guest: 'Alice Brown', mode: 'Occupied', lastAction: '10:45 AM', tabletStatus: 'Online' },
    { room: '106', guest: 'Bob White', mode: 'Idle', lastAction: '', tabletStatus: 'Offline' },
    { room: '107', guest: 'Charlie Black', mode: 'Do Not Disturb', lastAction: '09:30 AM', tabletStatus: 'Online' },
    { room: '108', guest: 'Diana Green', mode: 'Cleaning', lastAction: '', tabletStatus: 'Online' },
  ];

  // Dashboard summary cards data (matching the image)
  const dashboardStats = [
    { value: '135', label: 'Total Rooms', href: '/rooms' },
    { value: '6', label: 'Clean Requests', href: '/clean-requests' },
    { value: '3', label: 'Technical Issues', href: '/technical-issues' },
    { value: '4.2', label: 'Guest Feedback', href: '/feedback' },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "checkin":
      case "checkout":
        return <Users className="h-4 w-4" />;
      case "maintenance":
        return <Bed className="h-4 w-4" />;
      case "review":
        return <Bell className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-8 p-3 sm:p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Page Header */}
    

      {/* Live Room Status Section */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">
                  Live Room Status
                </CardTitle>
                <CardDescription>Current status of all rooms</CardDescription>
              </div>
              <div className="hidden sm:flex gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate('/rooms')}>Manage Rooms</Button>
                <Button size="sm" onClick={() => navigate('/guests')}>Manage Guests</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-2 sm:-mx-3 md:mx-0">
              <div className="h-48 overflow-y-auto text-xs sm:text-sm md:text-base">
                <style>{`
                  @media (max-width: 640px) {
                    table {
                      display: block;
                      width: 100%;
                      overflow-x: auto;
                      -webkit-overflow-scrolling: touch;
                    }
                    th, td {
                      padding: 0.5rem 0.25rem;
                    }
                    th:first-child, td:first-child {
                      position: sticky;
                      left: 0;
                      background: inherit;
                      z-index: 1;
                    }
                  }
                `}</style>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50/80 dark:bg-slate-700/50 backdrop-blur sticky top-0 z-10 whitespace-nowrap">
                    <tr>
                      <th className="px-2 sm:px-3 py-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Room</th>
                      <th className="px-2 sm:px-3 py-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Guest</th>
                      <th className="px-2 sm:px-3 py-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mode</th>
                      <th className="px-2 sm:px-3 py-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Action</th>
                      <th className="px-2 sm:px-3 py-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/70 dark:bg-slate-800/70 divide-y divide-gray-200 dark:divide-gray-700 whitespace-nowrap">
                    {liveRoomStatus.map((room, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-slate-700/50">
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{room.room}</td>
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-300">{room.guest}</td>
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-300">{room.mode}</td>
                        <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500 dark:text-gray-300">{room.lastAction || '—'}</td>
                        <td className="px-2 sm:px-3 py-2 whitespace-nowrap">
                          <span className={`px-1.5 py-0.5 inline-flex text-[10px] sm:text-xs leading-4 font-semibold rounded-full ${room.tabletStatus === 'Online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                            {room.tabletStatus === 'Online' ? 'Online' : 'Offline'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Summary Cards */}
      <div className="mx-auto w-full max-w-7xl my-3 sm:my-4 md:my-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {dashboardStats.map((stat, idx) => (
            <Card key={idx} onClick={() => navigate(stat.href)} className="cursor-pointer p-3 sm:p-4 md:p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-colors">
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{stat.value}</span>
                <span className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-300 text-center">{stat.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dashboard Quick Actions (below summary cards) */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Button
          className="w-full flex items-center justify-center sm:justify-start h-12 sm:h-14 text-xs sm:text-sm md:text-base font-medium border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-800/90 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors p-2 sm:p-3 text-center sm:text-left rounded-xl"
          variant="outline"
          onClick={() => navigate('/rooms')}
        >
          <span className="mr-1 sm:mr-2 text-xl sm:text-2xl">+</span>
          Add Room
        </Button>
        <Button
          className="w-full flex items-center justify-center sm:justify-start h-12 sm:h-14 text-xs sm:text-sm md:text-base font-medium border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-800/90 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors p-2 sm:p-3 text-center sm:text-left rounded-xl"
          variant="outline"
          onClick={() => navigate('/guests')}
        >
          <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Assign Guest
        </Button>
        <Button
          className="w-full flex items-center justify-center sm:justify-start h-12 sm:h-14 text-xs sm:text-sm md:text-base font-medium border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-800/90 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors p-2 sm:p-3 text-center sm:text-left rounded-xl"
          variant="outline"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Send Notification
        </Button>
        
        
        <Button
          className="w-full flex items-center justify-center sm:justify-start h-12 sm:h-14 text-xs sm:text-sm md:text-base font-medium border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-800/90 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors p-2 sm:p-3 text-center sm:text-left rounded-xl"
          variant="outline"
          onClick={() => navigate('/configure-display')}
        >
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          Configure Display
        </Button>
      </div>

      {/* Notifications Section */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <Card className="lg:col-span-2 border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-base">
              Latest hotel activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-base">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full justify-start h-11 sm:h-12 text-sm sm:text-base font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:border-gray-700 transition-all duration-200 group"
              variant="outline"
              onClick={() => {
                navigate("/guests");
                const event = new CustomEvent("showToast", {
                  detail: {
                    type: "info",
                    title: "Add New Guest",
                    message:
                      "Opening Guest Management with Add Guest form...",
                  },
                });
                window.dispatchEvent(event);
              }}
            >
              <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200 mr-2 sm:mr-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Add New Guest
            </Button>

            <Button
              className="w-full justify-start h-12 text-base font-medium hover:bg-green-50 hover:border-green-200 transition-all duration-200 group"
              variant="outline"
              onClick={() => {
                navigate("/rooms");
                const event = new CustomEvent("showToast", {
                  detail: {
                    type: "info",
                    title: "Room Management",
                    message: "Redirecting to Room Management...",
                  },
                });
                window.dispatchEvent(event);
              }}
            >
              <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors duration-200 mr-2 sm:mr-3">
                <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
              </div>
              Assign Room
            </Button>

            <Button
              className="w-full justify-start h-12 text-base font-medium hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 group"
              variant="outline"
              onClick={() => {
                navigate("/notifications");
                const event = new CustomEvent("showToast", {
                  detail: {
                    type: "info",
                    title: "Notifications",
                    message: "Redirecting to Notifications...",
                  },
                });
                window.dispatchEvent(event);
              }}
            >
              <div className="p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-200 mr-2 sm:mr-3">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              </div>
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
