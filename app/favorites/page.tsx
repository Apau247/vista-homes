'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { properties } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Heart, Trash2, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FavoritesPage() {
  const { user, loading, removeFavorite } = useAuth();
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('vista-favorites');
    if (saved) {
      setLocalFavorites(JSON.parse(saved));
    }
  }, []);

  const favorites = user
    ? properties.filter((p) => user.favorites.includes(p.id))
    : properties.filter((p) => localFavorites.includes(p.id));

  const clearAll = () => {
    if (user) {
      user.favorites.forEach((id) => removeFavorite(id));
    }
    localStorage.setItem('vista-favorites', JSON.stringify([]));
    setLocalFavorites([]);
    toast.success('Favorites cleared');
  };

  if (!mounted) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto mb-4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <section className="bg-navy text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-gold" />
              <div className="uppercase tracking-widest text-xs text-gold">Saved</div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-2">Your Favorites</h1>
            <p className="text-white/70">
              {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
              {user && ' — synced to your account'}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {!user && !loading && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
            <p className="text-sm text-zinc-600">
              <span className="font-medium">Sign in</span> to sync your favorites across devices.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-xl text-sm font-medium hover:bg-navy-light transition-colors"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </Link>
          </div>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-semibold text-zinc-800 mb-2">No favorites yet</h2>
            <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
              Start browsing properties and click the heart icon to save your favorites here.
            </p>
            <Link
              href="/properties"
              className="inline-block px-8 py-3.5 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={clearAll}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((property, i) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
