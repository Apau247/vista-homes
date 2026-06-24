'use client';

import { properties, neighborhoods, testimonials } from '@/lib/data';
import PropertyCard from '@/components/PropertyCard';
import Testimonials from '@/components/Testimonials';
import Neighborhoods from '@/components/Neighborhoods';
import Newsletter from '@/components/Newsletter';
import { SearchBar } from '@/components/SearchBar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Shield, Clock, Award } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Premium Properties', icon: Building2 },
  { value: '98%', label: 'Client Satisfaction', icon: Shield },
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '42', label: 'Cities Served', icon: Award },
];

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-white/20">
              California&apos;s Premier Real Estate Agency
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tighter mb-6 leading-[1.1]">
              Find Your{' '}
              <span className="text-gold">Vista</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-10 max-w-2xl mx-auto text-white/80">
              Exceptional homes. Extraordinary living. Your dream property awaits.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
          >
            <div>
              <div className="uppercase tracking-widest text-xs text-navy mb-3">Curated Selection</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-zinc-800">Featured Homes</h2>
            </div>
            <a href="/properties" className="text-sm text-navy hover:underline font-medium">
              View all properties &rarr;
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="uppercase tracking-widest text-xs text-gold mb-3">Why Choose Us</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Vista Homes by the Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-gold">{stat.value}</div>
                <div className="mt-2 text-zinc-300 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <Neighborhoods />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
