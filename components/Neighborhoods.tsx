'use client';

import Image from 'next/image';
import Link from 'next/link';
import { neighborhoods } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Neighborhoods() {
  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="uppercase tracking-widest text-xs text-navy mb-3">Explore</div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">Popular Neighborhoods</h2>
          </div>
          <Link href="/properties" className="hidden sm:block text-sm text-navy hover:underline">
            View all areas →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/properties?location=${encodeURIComponent(n.name)}`} className="group block relative h-48 rounded-2xl overflow-hidden">
                <Image
                  src={n.image}
                  alt={n.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{n.name}</h3>
                  <p className="text-white/80 text-sm">{n.count} properties</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link href="/properties" className="text-sm text-navy hover:underline">
            View all areas →
          </Link>
        </div>
      </div>
    </section>
  );
}
