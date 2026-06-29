'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { properties } from '@/lib/data';
import ImageGallery from '@/components/ImageGallery';
import PropertyCard from '@/components/PropertyCard';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Bed, Bath, Maximize2, MapPin, Calendar, Home, Phone, Mail,
  ChevronRight, Send, CheckCircle
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const property = properties.find((p) => p.id === params.id);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [showTour, setShowTour] = useState(false);

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-semibold text-zinc-800 mb-2">Property not found</h1>
        <p className="text-zinc-500 mb-6">The property you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/properties" className="inline-block px-6 py-3 bg-navy text-white rounded-xl hover:bg-navy-light transition-colors">
          Browse Properties
        </Link>
      </div>
    );
  }

  const similar = properties.filter(
    (p) => p.type === property.type && p.id !== property.id
  ).slice(0, 3);

  // TODO: Backend integration — these are placeholders that only show toasts.
  // Should POST to an API route to send the message and create a calendar event.
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      toast.error('Please fill in your name and email');
      return;
    }
    setContactSent(true);
    toast.success('Message sent! The agent will contact you shortly.');
  };

  const handleScheduleViewing = () => {
    if (!scheduleDate) {
      toast.error('Please select a date and time');
      return;
    }
    toast.success(`Viewing scheduled for ${new Date(scheduleDate).toLocaleString()}`);
  };

  const specs = [
    { icon: Bed, label: 'Bedrooms', value: property.bedrooms > 0 ? property.bedrooms : 'N/A' },
    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
    { icon: Maximize2, label: 'Square Feet', value: property.sqft.toLocaleString() },
    { icon: Home, label: 'Property Type', value: property.type },
    { icon: MapPin, label: 'Location', value: property.location },
    { icon: Calendar, label: 'Year Built', value: property.yearBuilt },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/properties" className="hover:text-navy transition-colors">Properties</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-800 font-medium truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ImageGallery images={property.images} title={property.title} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-navy">{formatPrice(property.price, property.status)}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-500">{property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-4 py-1.5 bg-navy/5 text-navy rounded-full text-sm font-medium">{property.type}</span>
                  <span className="px-4 py-1.5 bg-gold/10 text-gold/90 rounded-full text-sm font-medium">{property.status}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-800 mb-6">{property.title}</h1>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-zinc-50 rounded-xl p-4 text-center">
                    <spec.icon className="w-5 h-5 text-navy mx-auto mb-2" />
                    <div className="text-lg font-semibold text-zinc-800">{spec.value}</div>
                    <div className="text-xs text-zinc-500">{spec.label}</div>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-zinc-800 mb-3">Description</h2>
              <p className="text-zinc-600 leading-relaxed">{property.description}</p>
            </motion.div>

            {/* Virtual Tour */}
            {property.virtualTour && (
              <>
                <motion.button
                  onClick={() => setShowTour(true)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full bg-zinc-900 rounded-2xl h-64 flex items-center justify-center overflow-hidden group cursor-pointer text-left"
                >
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=400&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity" />
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1" />
                    </div>
                    <p className="text-white font-medium">Virtual Tour Available</p>
                    <p className="text-zinc-400 text-sm">Click to explore this property in 3D</p>
                  </div>
                </motion.button>

                {/* Tour Modal */}
                {showTour && (
                  <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden">
                      <iframe
                        src={property.virtualTour}
                        className="w-full h-full"
                        allow="fullscreen; gyroscope; accelerometer; magnetometer"
                        allowFullScreen
                      />
                      <button
                        onClick={() => setShowTour(false)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6"
            >
              <h3 className="font-semibold text-lg text-zinc-800 mb-4">Listed by</h3>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={property.agent.photo}
                  alt={property.agent.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-zinc-800">{property.agent.name}</div>
                  <div className="text-sm text-zinc-500">Real Estate Agent</div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-sm text-zinc-600 hover:text-navy transition-colors">
                  <Phone className="w-4 h-4" /> {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 text-sm text-zinc-600 hover:text-navy transition-colors">
                  <Mail className="w-4 h-4" /> {property.agent.email}
                </a>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleScheduleViewing}
                  className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
                >
                  Schedule Viewing
                </button>
                <div>
                  <input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-2.5 text-sm text-zinc-800 border border-zinc-200 outline-none mt-2"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6"
            >
              <h3 className="font-semibold text-lg text-zinc-800 mb-4">Send a Message</h3>
              {contactSent ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-medium text-zinc-800">Message sent!</p>
                  <p className="text-sm text-zinc-500">The agent will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <section className="mt-16 pt-16 border-t border-zinc-200">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-800 mb-8">Similar Properties</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
