'use client';

import { useState, useCallback, useEffect } from 'react';
import { getAllUsers, createUser, deleteUser, updateUserRole } from '@/lib/auth';
import { Users, Plus, X, Trash2, Shield, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';

type SessionUser = { id: string; name: string; email: string; phone: string; avatar: string; favorites: string[]; role: 'admin' | 'user'; createdAt: string };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' as 'admin' | 'user' });

  const load = useCallback(() => setUsers(getAllUsers() as SessionUser[]), []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    const result = createUser(form.name, form.email, form.password, form.role);
    if (!result) {
      toast.error('Email already in use');
      return;
    }
    toast.success('User created successfully');
    setShowAdd(false);
    setForm({ name: '', email: '', password: '', role: 'user' });
    load();
  };

  const handleDelete = (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    if (deleteUser(userId)) {
      toast.success('User deleted');
      load();
    } else {
      toast.error('Cannot delete admin user');
    }
  };

  const handleToggleRole = (userId: string, currentRole: 'admin' | 'user') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (updateUserRole(userId, newRole)) {
      toast.success(`Role changed to ${newRole}`);
      load();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-zinc-800">User Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-800">Add New User</h2>
              <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-zinc-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                  placeholder="Min 6 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'user' })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
              >
                Create User
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left">
                <th className="px-6 py-4 font-medium text-zinc-500">User</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Email</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Role</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Joined</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-navy font-medium text-sm">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                          u.name.charAt(0)
                        )}
                      </div>
                      <span className="font-medium text-zinc-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.role === 'admin' ? 'bg-violet-50 text-violet-600' : 'bg-zinc-100 text-zinc-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleRole(u.id, u.role)}
                        className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        title="Toggle role"
                      >
                        <Shield className="w-4 h-4 text-zinc-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <p>No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
