'use client';

import { testimonials } from '@/lib/data';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="uppercase tracking-widest text-xs text-navy mb-3">Testimonials</div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-800">What Our Clients Say</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-zinc-600 leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
              <div>
                <div className="font-semibold text-zinc-800">{t.name}</div>
                <div className="text-sm text-zinc-500">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
