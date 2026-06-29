'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  if (user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back!');
      router.push('/');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              V
            </div>
            <h1 className="text-2xl font-semibold text-zinc-800">Welcome Back</h1>
            <p className="text-zinc-500 text-sm mt-1">Sign in to your Vista Homes account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 pr-12 text-sm text-zinc-800 border border-zinc-200 outline-none focus:border-navy/30 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-navy text-white rounded-xl font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-navy font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>

          {/* NOTE: Demo credentials are for development only. Remove or secure
              in production. */}
          <div className="mt-4 bg-zinc-50 rounded-xl p-4 text-sm text-zinc-500">
            <p className="font-medium text-zinc-700 mb-1">Demo accounts:</p>
            <p>Email: <span className="text-navy">demo@vistahomes.com</span></p>
            <p>Password: <span className="text-navy">demo123</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
