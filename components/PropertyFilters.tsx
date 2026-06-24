'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { propertyTypes, statuses } from '@/lib/data';

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '');
  const [showMobile, setShowMobile] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    router.push(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocation('');
    setType('');
    setStatus('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setBathrooms('');
    router.push('/properties');
  };

  const hasFilters = location || type || status || minPrice || maxPrice || bedrooms || bathrooms;

  const filterContent = (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Location</label>
        <input
          type="text"
          placeholder="City or neighborhood..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Property Type</label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(type === t ? '' : t)}
              className={`px-3 py-2 text-sm rounded-xl border transition-colors ${
                type === t
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Status</label>
        <div className="grid grid-cols-3 gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(status === s ? '' : s)}
              className={`px-3 py-2 text-sm rounded-xl border transition-colors ${
                status === s
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Price Range</label>
        <div className="flex gap-3">
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-1 bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none"
          >
            <option value="">Min Price</option>
            <option value="0">$0</option>
            <option value="250000">$250K</option>
            <option value="500000">$500K</option>
            <option value="750000">$750K</option>
            <option value="1000000">$1M</option>
            <option value="2000000">$2M</option>
            <option value="5000000">$5M</option>
          </select>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="flex-1 bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none"
          >
            <option value="">Max Price</option>
            <option value="250000">$250K</option>
            <option value="500000">$500K</option>
            <option value="750000">$750K</option>
            <option value="1000000">$1M</option>
            <option value="2000000">$2M</option>
            <option value="5000000">$5M</option>
            <option value="10000000">$10M+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Bedrooms</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Bathrooms</label>
          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full bg-zinc-50 rounded-xl px-3 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-navy text-white py-3 rounded-xl font-medium text-sm hover:bg-navy-light transition-colors"
        >
          Apply Filters
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 text-sm text-zinc-500 hover:text-zinc-800 border border-zinc-200 rounded-xl transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowMobile(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasFilters && <span className="w-2 h-2 bg-navy rounded-full" />}
      </button>

      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-zinc-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-zinc-800">Filters</h3>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-navy hover:underline">
              Clear all
            </button>
          )}
        </div>
        {filterContent}
      </div>

      {showMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobile(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-zinc-800">Filters</h3>
              <button onClick={() => setShowMobile(false)} className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}
