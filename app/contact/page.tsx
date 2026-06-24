'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Layers } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [satellite, setSatellite] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSent(true);
    toast.success('Message sent! We will get back to you soon.');
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+1 (310) 555-0900', href: 'tel:+13105550900' },
    { icon: Mail, label: 'Email', value: 'info@vistahomes.com', href: 'mailto:info@vistahomes.com' },
    { icon: MapPin, label: 'Office', value: '123 Wilshire Blvd, Suite 500\nLos Angeles, CA 90025' },
    { icon: Clock, label: 'Hours', value: 'Mon-Fri: 9AM - 6PM\nSat: 10AM - 4PM' },
  ];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="uppercase tracking-widest text-xs text-gold mb-3">Get in Touch</div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">Contact Us</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Have a question, want to schedule a viewing, or ready to list your property? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-zinc-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-800">{info.label}</h3>
                      {info.href ? (
                        <a href={info.href} className="text-zinc-500 hover:text-navy transition-colors text-sm whitespace-pre-line">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-zinc-500 text-sm whitespace-pre-line">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-64 border border-zinc-200 relative">
                <iframe
                  title="Vista Homes Office Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=123+Wilshire+Blvd+Los+Angeles+CA+90025&output=embed${satellite ? '&maptype=satellite' : ''}`}
                  allowFullScreen
                />
                <button
                  onClick={() => setSatellite(!satellite)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-200 shadow-sm hover:bg-white transition-colors flex items-center gap-1.5 text-zinc-700"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {satellite ? 'Map' : 'Satellite'}
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-zinc-100"
              >
                <h2 className="text-2xl font-semibold text-zinc-800 mb-6">Send us a Message</h2>

                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-zinc-800 mb-2">Message Sent!</h3>
                    <p className="text-zinc-500">Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                          placeholder="(310) 555-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1.5">Subject</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none"
                        >
                          <option value="">Select a subject</option>
                          <option value="Buying">Buying a Property</option>
                          <option value="Selling">Selling a Property</option>
                          <option value="Renting">Renting</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1.5">Message *</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
