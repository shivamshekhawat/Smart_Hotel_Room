import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

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
  // Simulate currently logged-in user
  const currentUser: User = {
    username: "admin", // logged-in user
    email: "admin@hotel.com",
    role: "Admin",
    accessScope: "All",
  };

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: "",
    email: "",
    role: "Reception",
    accessScope: "",
  });

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

  // Add user
  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role) return;
    const user: User = {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      accessScope: newUser.accessScope || (newUser.role === "Admin" ? "All" : "Limited"),
      loginHistory: [],
      failedAttempts: 0,
      locked: false,
    };
    setUsers([...users, user]);
    setNewUser({ username: "", email: "", role: "Reception", accessScope: "" });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Add User Button (Admin only) */}
      {currentUser.role === "Admin" && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
          <Card className="w-full max-w-md p-6 relative">
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border p-2 rounded"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as User["role"] })
                }
              >
                <option value="Admin">Admin</option>
                <option value="Reception">Reception</option>
                <option value="Housekeeping">Housekeeping</option>
              </select>
              <input
                type="text"
                placeholder="Access Scope"
                className="w-full border p-2 rounded"
                value={newUser.accessScope}
                onChange={(e) => setNewUser({ ...newUser, accessScope: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Table */}
      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
        <CardHeader>
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
                    {currentUser.role === "Admin" && user.role !== "Admin" && (
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
                    {user.locked && currentUser.role === "Admin" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleUnlockUser(user.username)}
                      >
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

      {/* Login History & Status (Admin only) */}
    {/* Login History & Status (Admin only) */}
{currentUser.role === "Admin" && (
  <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
    <CardHeader>
      <CardTitle>Admin Login History</CardTitle>
      <CardDescription>Track admin login activity and account lockouts</CardDescription>
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
          {users
            .filter((user) => user.role === "Admin") // only Admins
            .map((user, idx) => (
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
)}

    </div>
  );
}
