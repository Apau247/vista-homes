'use client';

import { useState, useCallback, useEffect } from 'react';
import { properties } from '@/lib/data';
import { getAllUsers, getPropertyAssignments, setPropertyAssignment, removePropertyAssignment } from '@/lib/auth';
import { formatPrice } from '@/lib/utils';
import { Building2, UserCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';

type SessionUser = { id: string; name: string; email: string; phone: string; avatar: string; favorites: string[]; role: 'admin' | 'user'; createdAt: string };

export default function AdminPropertiesPage() {
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const load = useCallback(() => {
    setUsers(getAllUsers() as SessionUser[]);
    setAssignments(getPropertyAssignments());
  }, []);

  useEffect(() => { load(); }, [load]);

  const assignedUserId = selectedProperty ? assignments[selectedProperty] : null;
  const assignedUser = assignedUserId ? users.find((u) => u.id === assignedUserId) : null;

  const handleAssign = (userId: string) => {
    if (!selectedProperty) return;
    setPropertyAssignment(selectedProperty, userId);
    setAssignments({ ...assignments, [selectedProperty]: userId });
    toast.success('User assigned to property');
  };

  const handleRemove = () => {
    if (!selectedProperty) return;
    removePropertyAssignment(selectedProperty);
    const updated = { ...assignments };
    delete updated[selectedProperty];
    setAssignments(updated);
    toast.success('Assignment removed');
  };

  const agents = users.filter((u) => u.role === 'user');

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-800 mb-8">Property Assignments</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Properties List */}
        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
          <div className="p-5 border-b border-zinc-100">
            <h2 className="font-semibold text-zinc-800">Properties</h2>
          </div>
          <div className="divide-y divide-zinc-50 max-h-[600px] overflow-y-auto">
            {properties.map((p) => {
              const assigned = assignments[p.id];
              const agentName = assigned
                ? users.find((u) => u.id === assigned)?.name || p.agent.name
                : p.agent.name;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProperty(p.id)}
                  className={`w-full text-left px-5 py-4 hover:bg-zinc-50 transition-colors ${
                    selectedProperty === p.id ? 'bg-navy/5 ring-1 ring-navy/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-zinc-800 text-sm truncate">{p.title}</p>
                      <p className="text-xs text-zinc-500 truncate">{p.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-zinc-800">{formatPrice(p.price, p.status)}</p>
                      <p className="text-xs text-zinc-400">
                        {assigned ? `Assigned: ${agentName}` : `Agent: ${agentName}`}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Assignment Panel */}
        <div className="bg-white rounded-2xl border border-zinc-100 p-6">
          {!selectedProperty ? (
            <div className="text-center py-16">
              <Building2 className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 font-medium">Select a property</p>
              <p className="text-zinc-400 text-sm">Choose a property from the list to manage assignments</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-zinc-800">Assign User</h2>
                  <p className="text-sm text-zinc-500">
                    {properties.find((p) => p.id === selectedProperty)?.title}
                  </p>
                </div>
                {assignedUser && (
                  <button
                    onClick={handleRemove}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove
                  </button>
                )}
              </div>

              {assignedUser && (
                <div className="bg-navy/5 rounded-xl p-4 mb-6">
                  <p className="text-xs text-zinc-500 mb-1">Currently Assigned</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-medium">
                      {assignedUser.avatar ? (
                        <img src={assignedUser.avatar} alt={assignedUser.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        assignedUser.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-800 text-sm">{assignedUser.name}</p>
                      <p className="text-xs text-zinc-500">{assignedUser.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm font-medium text-zinc-700 mb-3">
                {agents.length} user{agents.length !== 1 ? 's' : ''} available
              </p>

              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {agents.map((u) => {
                  const isAssigned = assignments[selectedProperty] === u.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => handleAssign(u.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                        isAssigned
                          ? 'bg-navy text-white'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm ${
                        isAssigned ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
                      }`}>
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                        ) : (
                          u.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{u.name}</p>
                        <p className={`text-xs ${isAssigned ? 'text-white/70' : 'text-zinc-500'}`}>{u.email}</p>
                      </div>
                      {isAssigned && <UserCheck className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
