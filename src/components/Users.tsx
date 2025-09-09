import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Edit, Trash2 } from "lucide-react";

// User type definition
interface User {
  username: string;
  email: string;
  role: "Admin" | "Reception" | "Housekeeping";
  accessScope: string;
  loginHistory?: string[];
  failedAttempts?: number;
  locked?: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      username: "admin",
      email: "admin@hotel.com",
      role: "Admin",
      accessScope: "All",
      loginHistory: ["2025-09-09 08:45 AM", "2025-09-08 09:10 PM"],
      failedAttempts: 0,
      locked: false,
    },
    {
      username: "reception01",
      email: "reception@hotel.com",
      role: "Reception",
      accessScope: "All",
      loginHistory: ["2025-09-09 07:30 AM"],
      failedAttempts: 2,
      locked: false,
    },
    {
      username: "housekeeping_f2",
      email: "housekeeping.f2@hotel.com",
      role: "Housekeeping",
      accessScope: "Floor 2 only",
      loginHistory: ["2025-09-07 06:10 PM"],
      failedAttempts: 5,
      locked: true,
    },
  ]);

  // Unlock user handler
  const handleUnlockUser = (username: string) => {
    setUsers(
      users.map((user) =>
        user.username === username ? { ...user, locked: false, failedAttempts: 0 } : user
      )
    );
  };

  // Delete user
  const handleDeleteUser = (username: string) => {
    setUsers(users.filter((u) => u.username !== username));
  };

  // Edit user (placeholder)
  const handleEditUser = (user: User) => {
    alert(`Editing ${user.username}`);
  };

  return (
    <div className="space-y-6">
      {/* Users Table */}
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
        <CardHeader>
          {/* <CardTitle>User Management</CardTitle> */}
          <CardDescription>Manage system users, roles, and access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Access</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.accessScope}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {user.role !== "Admin" && (
                      <>
                        <Button size="icon" variant="ghost" onClick={() => handleEditUser(user)}>
                          <Edit className="h-5 w-5 text-blue-500" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user.username)}
                        >
                          <Trash2 className="h-5 w-5 text-red-500" />
                        </Button>
                      </>
                    )}
                    {user.locked && (
                      <Button size="sm" variant="destructive" onClick={() => handleUnlockUser(user.username)}>
                        Unlock
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Login History + Lockout Status */}
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle>User Login History & Status</CardTitle>
          <CardDescription>Track login activity and account lockouts</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Last Login</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Failed Attempts</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.loginHistory?.[0] || "Never"}</td>
                  <td className="px-4 py-2">{user.failedAttempts || 0}</td>
                  <td className="px-4 py-2">
                    {user.locked ? (
                      <span className="text-red-500 font-semibold">Locked</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
