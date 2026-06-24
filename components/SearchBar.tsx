'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, MapPin, X } from 'lucide-react';
import { propertyTypes } from '@/lib/data';

export function SearchBar({ variant = 'hero' }: { variant?: 'hero' | 'compact' }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    router.push(`/properties?${params.toString()}`);
  }, [location, type, minPrice, maxPrice, bedrooms, router]);

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 shadow-sm">
        <Search className="w-4 h-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 text-sm bg-transparent border-none outline-none text-zinc-800 placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="bg-navy text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-navy-light transition-colors"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 bg-zinc-50 rounded-xl px-4 py-3">
            <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="City, neighborhood, or address..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-zinc-800 placeholder:text-zinc-400"
            />
            {location && (
              <button type="button" onClick={() => setLocation('')} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="sm:w-40">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-zinc-800 border-none outline-none appearance-none cursor-pointer"
            >
              <option value="">All Types</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-navy text-white px-8 py-3 rounded-xl font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Search</span>
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-colors ${showFilters ? 'bg-navy text-white border-navy' : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showFilters && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mt-3 animate-fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Min Price</label>
              <select
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border-none outline-none"
              >
                <option value="">No Min</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
                <option value="2000000">$2M</option>
                <option value="5000000">$5M</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Max Price</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border-none outline-none"
              >
                <option value="">No Max</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
                <option value="2000000">$2M</option>
                <option value="5000000">$5M</option>
                <option value="10000000">$10M</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border-none outline-none"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => { setLocation(''); setType(''); setMinPrice(''); setMaxPrice(''); setBedrooms(''); }}
                className="w-full py-2.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors border border-zinc-200 rounded-xl"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
