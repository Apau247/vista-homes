'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Subscribed to newsletter!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          Stay in the Loop
        </h2>
        <p className="text-zinc-300 mb-8 max-w-lg mx-auto">
          Get the latest property listings, market insights, and exclusive offers delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-zinc-400 outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-gold text-navy font-semibold rounded-xl hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
          >
            Subscribe
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
