'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, CheckCircle, Upload } from 'lucide-react';
import { propertyTypes, statuses } from '@/lib/data';

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: '', price: '', location: '', type: '', bedrooms: '', bathrooms: '',
    sqft: '', status: '', description: '', name: '', email: '', phone: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // TODO: Backend integration — this currently only shows a toast.
  // Should POST to an API route to store the submission and notify agents.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location || !form.name || !form.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSent(true);
    toast.success('Property submitted! Our team will review and contact you.');
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="uppercase tracking-widest text-xs text-gold mb-3">Sellers</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">List Your Property</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Ready to sell or rent your property? Fill out the form below and one of our agents will reach out within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-zinc-100"
          >
            {sent ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-zinc-800 mb-2">Property Submitted!</h2>
                <p className="text-zinc-500 mb-6">
                  Thank you! A Vista Homes agent will review your property and contact you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ title: '', price: '', location: '', type: '', bedrooms: '', bathrooms: '', sqft: '', status: '', description: '', name: '', email: '', phone: '' }); }}
                  className="px-6 py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-800 mb-4">Property Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">Property Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                        placeholder="e.g., Luxury Waterfront Villa"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Price *</label>
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="e.g., 1250000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Location *</label>
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="e.g., Malibu, CA"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Property Type</label>
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                        >
                          <option value="">Select type</option>
                          {propertyTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Status</label>
                        <select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                        >
                          <option value="">Select status</option>
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Square Feet</label>
                        <input
                          type="number"
                          name="sqft"
                          value={form.sqft}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="e.g., 3200"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bedrooms</label>
                        <select
                          name="bedrooms"
                          value={form.bedrooms}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Bathrooms</label>
                        <select
                          name="bathrooms"
                          value={form.bathrooms}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">Description</label>
                      <textarea
                        name="description"
                        rows={4}
                        value={form.description}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors resize-none"
                        placeholder="Describe your property..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">Photos</label>
                      <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center hover:border-navy/30 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                        <p className="text-sm text-zinc-500">Drag & drop photos or click to browse</p>
                        <p className="text-xs text-zinc-400 mt-1">Max 10MB per file</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-100 pt-6">
                  <h2 className="text-xl font-semibold text-zinc-800 mb-4">Your Contact Info</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                        placeholder="(310) 555-0000"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Property
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
