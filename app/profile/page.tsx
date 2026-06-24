'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { properties } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Heart, LogOut, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
      setBio((user as any).bio || '');
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-8 bg-zinc-100 rounded-lg w-48 mx-auto mb-2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const userFavorites = properties.filter((p) => user.favorites.includes(p.id));

  const handleSave = () => {
    setSaving(true);
    updateProfile({ name, phone, bio: bio || undefined });
    setTimeout(() => {
      setSaving(false);
      toast.success('Profile updated');
    }, 300);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    router.push('/');
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10 ring-2 ring-white/20">
                <Image src={user.avatar} alt={user.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{user.name}</h1>
                <p className="text-white/70 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {user.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors flex items-center gap-2 text-sm"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100"
            >
              <h2 className="font-semibold text-lg text-zinc-800 mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                    placeholder="Add your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bio / About</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-2.5 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100"
            >
              <h2 className="font-semibold text-lg text-zinc-800 mb-4">Account Info</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-zinc-600">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-zinc-600">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  {user.phone || 'Not provided'}
                </div>
                <div className="flex items-center gap-3 text-zinc-600">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  Member since {memberSince}
                </div>
                <div className="flex items-center gap-3 text-zinc-600">
                  <Heart className="w-4 h-4 text-zinc-400" />
                  {user.favorites.length} saved properties
                </div>
              </div>
            </motion.div>
          </div>

          {/* Saved Properties */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xl font-semibold text-zinc-800 mb-6">Your Saved Properties</h2>
              {userFavorites.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 border border-zinc-100 text-center">
                  <Heart className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                  <h3 className="font-semibold text-zinc-800 mb-1">No saved properties</h3>
                  <p className="text-sm text-zinc-500 mb-4">Start browsing and save properties you love.</p>
                  <Link
                    href="/properties"
                    className="inline-block px-6 py-2.5 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
                  >
                    Browse Properties
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {userFavorites.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <PropertyCard property={p} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
