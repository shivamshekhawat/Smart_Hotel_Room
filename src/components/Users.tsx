import React, { useState } from 'react';
import { User } from '../App';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { UserPlus, Edit, Trash2, Shield } from 'lucide-react';

const roleColors: Record<string, string> = {
  Admin: 'bg-red-100 text-red-800',
  Reception: 'bg-blue-100 text-blue-800',
  Housekeeping: 'bg-green-100 text-green-800',
};

const roleOptions = ['Admin', 'Reception', 'Housekeeping'];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      username: 'admin',
      email: 'admin@hotel.com',
      role: 'Admin',
      accessScope: 'All',
    },
    {
      username: 'reception01',
      email: 'reception@hotel.com',
      role: 'Reception',
      accessScope: 'All',
    },
    {
      username: 'housekeeping_f2',
      email: 'housekeeping.f2@hotel.com',
      role: 'Housekeeping',
      accessScope: 'Floor 2 only',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({ username: '', email: '', role: 'Reception', accessScope: '' });

  const getRoleBadge = (role: string) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>{role}</span>
  );

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleDeleteUser = (username: string) => {
    // In a real app, this would show a confirmation dialog
    setUsers(users.filter(user => user.username !== username));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setNewUser({ username: '', email: '', role: 'Reception', accessScope: '' });
    setShowAddModal(true);
  };

  // Set form values when editing a user
  React.useEffect(() => {
    if (editingUser) {
      setNewUser({ ...editingUser });
    }
  }, [editingUser]);

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.username === editingUser.username ? { ...newUser } : user
      ));
      setEditingUser(null);
    } else {
      // Add new user
      setUsers([...users, newUser]);
    }
    setShowAddModal(false);
    setNewUser({ username: '', email: '', role: 'Reception', accessScope: '' });
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Page Header */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">User Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage staff roles, access scopes, and accounts</p>
          </div>
          <div>
            <Button onClick={handleAddUser} className="flex items-center gap-2" variant="default">
              <UserPlus className="h-5 w-5" /> Add User
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl">
      <Card className="mb-8 border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Users</CardTitle>
          <CardDescription>
            Manage system access, roles, and permissions for hotel staff.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-800/90">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Access Scope</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.accessScope}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditUser(user)} title="Edit user">
                        <Edit className="h-5 w-5 text-blue-500" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteUser(user.username)} title="Delete user">
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleAddUserSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  disabled={!!editingUser}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  required
                >
                  {roleOptions.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Access Scope</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={newUser.accessScope}
                  onChange={e => setNewUser({ ...newUser, accessScope: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  {editingUser ? 'Update User' : 'Add User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

