'use client';

import { useMemo } from 'react';
import { properties } from '@/lib/data';
import { getAllUsers } from '@/lib/auth';
import { Building2, Users, Home, DollarSign } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const stats = useMemo(() => {
    const users = getAllUsers();
    const total = properties.length;
    const forSale = properties.filter((p) => p.status === 'For Sale').length;
    const forRent = properties.filter((p) => p.status === 'For Rent').length;
    const totalValue = properties
      .filter((p) => p.status !== 'For Rent')
      .reduce((sum, p) => sum + p.price, 0);
    return { users: users.length, total, forSale, forRent, totalValue };
  }, []);

  const cards = [
    { label: 'Total Properties', value: stats.total, icon: Building2, color: 'bg-blue-500' },
    { label: 'For Sale', value: stats.forSale, icon: Home, color: 'bg-emerald-500' },
    { label: 'For Rent', value: stats.forRent, icon: DollarSign, color: 'bg-amber-500' },
    { label: 'Registered Users', value: stats.users, icon: Users, color: 'bg-violet-500' },
  ];

  const recentProperties = [...properties].slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-800 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl border border-zinc-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-zinc-800">{card.value}</div>
              <div className="text-sm text-zinc-500">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="text-lg font-semibold text-zinc-800">Recent Properties</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left">
                <th className="px-6 py-4 font-medium text-zinc-500">Title</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Type</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Status</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Price</th>
                <th className="px-6 py-4 font-medium text-zinc-500">Agent</th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((p) => (
                <tr key={p.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-800">{p.title}</td>
                  <td className="px-6 py-4 text-zinc-500">{p.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === 'For Sale' ? 'bg-emerald-50 text-emerald-600' :
                      p.status === 'For Rent' ? 'bg-amber-50 text-amber-600' :
                      'bg-zinc-100 text-zinc-500'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-800 font-medium">{formatPrice(p.price, p.status)}</td>
                  <td className="px-6 py-4 text-zinc-500">{p.agent.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
