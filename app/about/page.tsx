'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Shield, Clock, Award, Users, Target, Heart, Sparkles } from 'lucide-react';
import Testimonials from '@/components/Testimonials';

const team = [
  { name: 'Sarah Chen', role: 'CEO & Founder', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Michael Torres', role: 'Head of Sales', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Elena Rodriguez', role: 'Senior Agent', photo: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'James Wilson', role: 'Commercial Director', photo: 'https://randomuser.me/api/portraits/men/86.jpg' },
];

const values = [
  { icon: Heart, title: 'Client First', description: 'Every decision we make starts with our clients needs and goals.' },
  { icon: Target, title: 'Market Expertise', description: 'Deep local knowledge combined with data-driven insights.' },
  { icon: Sparkles, title: 'Premium Service', description: 'White-glove treatment throughout your entire journey.' },
  { icon: Users, title: 'Community Focused', description: 'Building stronger communities one property at a time.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&h=600&fit=crop&q=80')" }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="uppercase tracking-widest text-xs text-gold mb-3">About Us</div>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight mb-4">Our Story</h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              For over 15 years, Vista Homes has been helping families find their perfect place in California.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="uppercase tracking-widest text-xs text-navy mb-3">Our Mission</div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-800 mb-6">
                Redefining the Real Estate Experience
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Founded in 2009, Vista Homes started with a simple vision: to make finding a home a joyful, 
                transparent, and empowering experience. What began as a small team of passionate agents has 
                grown into one of California&apos;s most trusted real estate firms.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                We combine cutting-edge technology with old-fashioned personal service, ensuring every client 
                receives the attention and expertise they deserve. From first-time buyers to seasoned investors, 
                we&apos;re here to guide you home.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-80 sm:h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80"
                alt="Vista Homes team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="uppercase tracking-widest text-xs text-navy mb-3">What We Stand For</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-800">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-zinc-100 text-center"
              >
                <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="font-semibold text-lg text-zinc-800 mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="uppercase tracking-widest text-xs text-navy mb-3">Leadership</div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-800">Meet Our Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden bg-zinc-100">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <h3 className="font-semibold text-lg text-zinc-800">{member.name}</h3>
                <p className="text-sm text-zinc-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Properties Sold', icon: Building2 },
              { value: '98%', label: 'Happy Clients', icon: Shield },
              { value: '15+', label: 'Years in Business', icon: Clock },
              { value: '50+', label: 'Awards Won', icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl font-bold text-gold">{stat.value}</div>
                <div className="mt-1 text-zinc-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
