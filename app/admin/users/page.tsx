'use client';

import { useState, useCallback, useEffect } from 'react';
import { getAllUsers, createUser, deleteUser, updateUserRole, updateUserProfile, setPropertyAssignment, getPropertyAssignments, removePropertyAssignment } from '@/lib/auth';
import { properties } from '@/lib/data';
import { Users, Plus, X, Trash2, Shield, Pencil, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

type SessionUser = Awaited<ReturnType<typeof getAllUsers>>[number];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<SessionUser | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'user' as 'admin' | 'user',
    phone: '', avatar: '', bio: '', assignProperties: [] as string[],
  });
  const [avatarPreview, setAvatarPreview] = useState('');

  const load = useCallback(() => {
    setUsers(getAllUsers() as SessionUser[]);
    setAssignments(getPropertyAssignments());
  }, []);

  useEffect(() => { load(); }, [load]);

  const generateAvatar = () => {
    const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'User')}&background=0a2540&color=fff&size=200`;
    setForm({ ...form, avatar: url });
    setAvatarPreview(url);
  };

  const resetForm = () => {
    setForm({ name: '', email: '', password: '', role: 'user', phone: '', avatar: '', bio: '', assignProperties: [] });
    setAvatarPreview('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in name, email, and password');
      return;
    }
    const result = createUser(form.name, form.email, form.password, form.role, {
      phone: form.phone,
      avatar: form.avatar || undefined,
      bio: form.bio || undefined,
    });
    if (!result) {
      toast.error('Email already in use');
      return;
    }
    form.assignProperties.forEach((pid) => setPropertyAssignment(pid, result.id));
    toast.success('User created successfully');
    setShowAdd(false);
    resetForm();
    load();
  };

  const handleEdit = (u: SessionUser) => {
    setEditUser(u);
    const userAssignments = Object.entries(getPropertyAssignments())
      .filter(([, v]) => v === u.id)
      .map(([k]) => k);
    setForm({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role,
      phone: u.phone || '',
      avatar: u.avatar || '',
      bio: (u as any).bio || '',
      assignProperties: userAssignments,
    });
    setAvatarPreview(u.avatar || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    if (!form.name || !form.email) {
      toast.error('Name and email are required');
      return;
    }
    updateUserProfile(editUser.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar || undefined,
      bio: form.bio || undefined,
      role: form.role,
    });

    const current = getPropertyAssignments();
    Object.entries(current).forEach(([pid, uid]) => {
      if (uid === editUser.id && !form.assignProperties.includes(pid)) {
        removePropertyAssignment(pid);
      }
    });
    form.assignProperties.forEach((pid) => {
      setPropertyAssignment(pid, editUser.id);
    });

    toast.success('User updated');
    setEditUser(null);
    resetForm();
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

  const assignedTo = (userId: string) =>
    Object.entries(assignments).filter(([, v]) => v === userId).map(([k]) => properties.find((p) => p.id === k)?.title).filter(Boolean);

  type ModalMode = 'add' | 'edit';
  const modalMode: ModalMode | null = showAdd ? 'add' : editUser ? 'edit' : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-zinc-800">User Management</h1>
        <button
          onClick={() => { resetForm(); setShowAdd(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-zinc-800">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h2>
              <button
                onClick={() => { setShowAdd(false); setEditUser(null); resetForm(); }}
                className="p-1 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
            <form onSubmit={modalMode === 'add' ? handleCreate : handleSaveEdit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    {modalMode === 'add' ? 'Password *' : 'New Password (leave blank to keep)'}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                    placeholder={modalMode === 'add' ? 'Min 6 characters' : 'Leave blank to keep'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                    placeholder="(310) 555-0000"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                  Profile Picture URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.avatar}
                    onChange={(e) => {
                      setForm({ ...form, avatar: e.target.value });
                      setAvatarPreview(e.target.value);
                    }}
                    className="flex-1 bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30"
                    placeholder="https://... or click Generate"
                  />
                  <button type="button" onClick={generateAvatar} className="px-4 py-3 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-sm text-zinc-600 transition-colors flex-shrink-0">
                    Generate
                  </button>
                </div>
                {avatarPreview && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={avatarPreview} alt="Preview" className="w-14 h-14 rounded-full object-cover border border-zinc-200" />
                    <span className="text-xs text-zinc-400">Preview</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bio / Specialty</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 resize-none"
                  rows={2}
                  placeholder="e.g. Luxury home specialist, 10+ years experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Assign to Properties</label>
                <div className="bg-zinc-50 rounded-xl border border-zinc-200 max-h-48 overflow-y-auto p-1.5 space-y-0.5">
                  {properties.length === 0 && (
                    <p className="text-xs text-zinc-400 py-2 px-2">No properties available</p>
                  )}
                  {properties.map((p) => {
                    const checked = form.assignProperties.includes(p.id);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          checked ? 'bg-navy/10 text-navy' : 'hover:bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setForm({
                              ...form,
                              assignProperties: checked
                                ? form.assignProperties.filter((id) => id !== p.id)
                                : [...form.assignProperties, p.id],
                            })
                          }
                          className="w-4 h-4 accent-navy rounded"
                        />
                        <span className="text-sm">{p.title}</span>
                        <span className="text-xs text-zinc-400 ml-auto">{p.location}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
              >
                {modalMode === 'add' ? 'Create User' : 'Save Changes'}
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
                <th className="px-6 py-4 font-medium text-zinc-500">Contact</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Role</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Bio</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Assigned Properties</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Joined</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const assigned = assignedTo(u.id);
                return (
                  <tr key={u.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-navy font-medium text-sm overflow-hidden flex-shrink-0">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                          ) : (
                            u.name.charAt(0)
                          )}
                        </div>
                        <span className="font-medium text-zinc-800">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-zinc-500">{u.email}</div>
                      {u.phone && <div className="text-xs text-zinc-400">{u.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        u.role === 'admin' ? 'bg-violet-50 text-violet-600' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs max-w-[160px] truncate">
                      {(u as any).bio || '—'}
                    </td>
                    <td className="px-6 py-4">
                      {assigned.length > 0 ? (
                        <div className="flex flex-col gap-0.5">
                          {assigned.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-xs text-zinc-600 truncate max-w-[180px]">{t}</span>
                          ))}
                          {assigned.length > 2 && <span className="text-xs text-zinc-400">+{assigned.length - 2} more</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <Pencil className="w-4 h-4 text-zinc-500" />
                        </button>
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
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-400">
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
