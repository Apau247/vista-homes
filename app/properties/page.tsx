'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { properties } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { SearchBar } from '@/components/SearchBar';
import { motion } from 'framer-motion';
import { Grid3X3, List, ArrowUpDown } from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let result = [...properties];

    const location = searchParams.get('location')?.toLowerCase();
    const type = searchParams.get('type')?.toLowerCase();
    const status = searchParams.get('status')?.toLowerCase();
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');

    if (location) {
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(location) ||
          p.city.toLowerCase().includes(location)
      );
    }
    if (type) {
      result = result.filter((p) => p.type.toLowerCase() === type);
    }
    if (status) {
      result = result.filter((p) => p.status.toLowerCase() === status);
    }
    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }
    if (bedrooms) {
      result = result.filter((p) => p.bedrooms >= Number(bedrooms));
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'beds-desc':
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'sqft-desc':
        result.sort((a, b) => b.sqft - a.sqft);
        break;
      default:
        break;
    }

    return result;
  }, [searchParams, sort]);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-navy text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="uppercase tracking-widest text-xs text-gold mb-3">Browse</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">Properties</h1>
            <SearchBar variant="compact" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <PropertyFilters />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <PropertyFilters />
                <p className="text-sm text-zinc-500">
                  <span className="font-semibold text-zinc-800">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-xl p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-navy text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-navy text-white' : 'text-zinc-500 hover:text-zinc-800'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-white border border-zinc-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-zinc-700 outline-none cursor-pointer"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="beds-desc">Most Bedrooms</option>
                    <option value="sqft-desc">Largest Area</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-zinc-800 mb-2">No properties found</h3>
                <p className="text-zinc-500">Try adjusting your filters or search criteria</p>
              </div>
            ) : view === 'grid' ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6">
                {filtered.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <PropertyCard property={property} view="grid" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <PropertyCard property={property} view="list" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto mb-4 animate-pulse" />
            <div className="h-8 bg-zinc-100 rounded-lg w-48 mx-auto mb-2 animate-pulse" />
          </div>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
