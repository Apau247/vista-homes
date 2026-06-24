'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Property } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

export default function PropertyCard({ property, view = 'grid' }: { property: Property; view?: 'grid' | 'list' }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vista-favorites');
    if (saved) {
      const ids = JSON.parse(saved) as string[];
      setFavorited(ids.includes(property.id));
    }
  }, [property.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = localStorage.getItem('vista-favorites');
    let ids: string[] = saved ? JSON.parse(saved) : [];
    if (favorited) {
      ids = ids.filter((id) => id !== property.id);
      toast.success('Removed from favorites');
    } else {
      ids.push(property.id);
      toast.success('Added to favorites');
    }
    localStorage.setItem('vista-favorites', JSON.stringify(ids));
    setFavorited(!favorited);
  };

  if (view === 'list') {
    return (
      <Link href={`/property/${property.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-zinc-100 flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-72 h-56 sm:h-auto flex-shrink-0">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, 288px"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition z-10"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-zinc-700'}`} />
          </button>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
            {property.status}
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-bold text-navy">{formatPrice(property.price, property.status)}</div>
                <div className="flex items-center gap-1 text-zinc-500 text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location}
                </div>
              </div>
              <span className="text-xs font-medium px-3 py-1 bg-navy/5 text-navy rounded-full whitespace-nowrap">
                {property.type}
              </span>
            </div>
            <h3 className="font-semibold mt-2 text-lg text-zinc-800">{property.title}</h3>
            <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{property.description}</p>
          </div>
          <div className="flex items-center gap-6 mt-4 text-sm text-zinc-600 border-t pt-4 border-zinc-100">
            <div className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {property.bedrooms} {property.bedrooms === 0 ? '' : property.bedrooms === 1 ? 'Bed' : 'Beds'}</div>
            <div className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</div>
            <div className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {property.sqft.toLocaleString()} sqft</div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/property/${property.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-zinc-100 flex flex-col">
      <div className="relative h-56 sm:h-64">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition z-10"
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-zinc-700'}`} />
        </button>
        <div className="absolute top-4 left-4">
          <span className="bg-navy text-white px-3 py-1 rounded-full text-xs font-medium">
            {property.type}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
          {property.status}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="text-xl font-bold text-navy">{formatPrice(property.price, property.status)}</div>
            <div className="flex items-center gap-1 text-zinc-500 text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              {property.location}
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-zinc-800 leading-tight">{property.title}</h3>
        <div className="flex items-center gap-4 mt-3 text-sm text-zinc-600">
          <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {property.bedrooms > 0 ? property.bedrooms : '-'}</div>
          <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {property.bathrooms}</div>
          <div className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {property.sqft.toLocaleString()}</div>
        </div>
        <div className="mt-auto pt-4">
          <div className="w-full py-3 text-center bg-zinc-900 hover:bg-navy text-white rounded-xl transition-all text-sm font-medium">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}
