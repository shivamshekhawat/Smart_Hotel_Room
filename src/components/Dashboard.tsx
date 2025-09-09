import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Users, Bed, Bell, Clock, Settings } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Live Room Status mock data
  const liveRoomStatus = [
    { room: "101", floor: "1", guest: "Guest", mode: "Idle", lastAction: "11:10 AM", tabletStatus: "Online" },
    { room: "102", floor: "1", guest: "Jane Smith", mode: "Do Not Disturb", lastAction: "10:45 AM", tabletStatus: "Online" },
    { room: "103", floor: "1", guest: "John Doe", mode: "Cleaning", lastAction: "09:30 AM", tabletStatus: "Offline" },
    { room: "108", floor: "1", guest: "Diana Green", mode: "Cleaning", lastAction: "08:15 AM", tabletStatus: "Online" },
    { room: "107", floor: "1", guest: "Charlie Black", mode: "Do Not Disturb", lastAction: "07:30 AM", tabletStatus: "Online" },
    { room: "105", floor: "1", guest: "Alice Brown", mode: "Occupied", lastAction: "06:45 AM", tabletStatus: "Online" },
    { room: "104", floor: "1", guest: "Guest", mode: "Idle", lastAction: "05:20 AM", tabletStatus: "Online" },
    { room: "106", floor: "1", guest: "Bob White", mode: "Idle", lastAction: "04:10 AM", tabletStatus: "Offline" },
  ];

  const notifications = [
    { id: 1, type: "checkin", message: "New guest checked in to Room 205", time: "2 minutes ago" },
    { id: 2, type: "maintenance", message: "Maintenance request for Room 312", time: "15 minutes ago" },
    { id: 3, type: "checkout", message: "Guest checked out from Room 108", time: "1 hour ago" },
    { id: 4, type: "review", message: "New 5-star review received", time: "2 hours ago" },
  ];

  const dashboardStats = [
    { value: "135", label: "Total Rooms", href: "/rooms" },
    { value: "6", label: "Clean Requests", href: "/clean-requests" },
    { value: "3", label: "Technical Issues", href: "/technical-issues" },
    { value: "4.2", label: "Guest Feedback", href: "/feedback" },
  ];

  const [filters, setFilters] = useState({ floor: "", room: "", status: "" });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRooms = liveRoomStatus.filter((r) => {
    const byFloor = filters.floor ? r.floor === filters.floor : true;
    const byRoom = filters.room ? r.room === filters.room : true;
    const byStatus = filters.status ? r.mode === filters.status : true;
    return byFloor && byRoom && byStatus;
  });

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
    <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Live Room Status */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 gap-6">
        <Card className="border border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
              <div>
                <CardTitle className="text-xl font-semibold">Live Room Status</CardTitle>
                <CardDescription>Current status of all rooms</CardDescription>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  className="text-sm border rounded-lg px-2 py-1 bg-white dark:bg-slate-700 dark:text-white"
                  value={filters.floor}
                  onChange={(e) => handleFilterChange("floor", e.target.value)}
                >
                  <option value="">All Floors</option>
                  {liveRoomStatus
                    .map((r) => r.floor)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((floor) => (
                    <option key={floor} value={floor}>
                      Floor {floor}
                    </option>
                  ))}
                </select>

                <select
                  className="text-sm border rounded-lg px-2 py-1 bg-white dark:bg-slate-700 dark:text-white"
                  value={filters.room}
                  onChange={(e) => handleFilterChange("room", e.target.value)}
                >
                  <option value="">All Rooms</option>
                  {liveRoomStatus
                    .map((r) => r.room)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((room) => (
                    <option key={room} value={room}>
                      Room {room}
                    </option>
                  ))}
                </select>

                <select
                  className="text-sm border rounded-lg px-2 py-1 bg-white dark:bg-slate-700 dark:text-white"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Status</option>
                  {liveRoomStatus
                    .map((r) => r.mode)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <div className="h-56 overflow-y-auto text-sm scrollbar-thin">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Room</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Guest</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Live Room Status</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Action</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredRooms.map((room, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 font-medium">{room.room}</td>
                        <td className="px-3 py-2 text-gray-500 dark:text-gray-300">{room.guest}</td>
                        <td className="px-3 py-2 text-gray-500 dark:text-gray-300">{room.mode}</td>
                        <td className="px-3 py-2 text-gray-500 dark:text-gray-300">{room.lastAction}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              room.tabletStatus === "Online" ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {room.tabletStatus}
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

      {/* Summary Cards */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardStats.map((stat, idx) => (
          <Card
            key={idx}
            onClick={() => navigate(stat.href)}
            className="cursor-pointer p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">{stat.label}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          className="flex-1 flex items-center justify-center sm:justify-start h-12 text-sm font-medium border bg-white dark:bg-slate-800 rounded-xl"
          variant="outline"
          onClick={() => navigate("/guests")}
        >
          <Users className="h-4 w-4 mr-2" />
          Assign Guest
        </Button>

        <Button
          className="flex-1 flex items-center justify-center sm:justify-start h-12 text-sm font-medium border bg-white dark:bg-slate-800 rounded-xl"
          variant="outline"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-4 w-4 mr-2" />
          Send Notification
        </Button>

        <Button
          className="flex-1 flex items-center justify-center sm:justify-start h-12 text-sm font-medium border bg-white dark:bg-slate-800 rounded-xl"
          variant="outline"
          onClick={() => navigate("/configure-display")}
        >
          <Settings className="h-4 w-4 mr-2" />
          Configure Display
        </Button>
      </div>

      {/* Notifications */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest hotel activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 border rounded-lg dark:border-gray-700"
                >
                  <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
                    {getNotificationIcon(n.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.message}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" /> {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="border bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start h-11 text-sm font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
              variant="outline"
              onClick={() => navigate("/guests")}
            >
              <Users className="h-4 w-4 mr-2" />
              Add New Guest
            </Button>
            <Button
              className="w-full justify-start h-11 text-sm font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
              variant="outline"
              onClick={() => navigate("/rooms")}
            >
              <Bed className="h-4 w-4 mr-2" />
              Add Room
            </Button>
            <Button
              className="w-full justify-start h-11 text-sm font-medium bg-transparent hover:bg-gray-100 dark:hover:bg-gray-600"
              variant="outline"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
