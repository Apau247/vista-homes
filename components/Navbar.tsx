'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Heart, User, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/properties', label: 'Properties' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-navy-light transition-colors">
              V
            </div>
            <div>
              <div className="font-semibold text-xl sm:text-2xl tracking-tight text-navy">Vista Homes</div>
              <div className="text-[10px] sm:text-xs text-zinc-500 -mt-0.5 tracking-wider uppercase">Real Estate</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  pathname === link.href ? 'text-navy' : 'text-zinc-600 hover:text-navy'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-navy transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <Link
              href="/favorites"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                pathname === '/favorites' ? 'text-navy' : 'text-zinc-600 hover:text-navy'
              }`}
            >
              <Heart className={`w-4 h-4 ${pathname === '/favorites' ? 'fill-navy text-navy' : ''}`} />
              Favorites
            </Link>
            {user ? (
              <Link
                href="/profile"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  pathname === '/profile' ? 'text-navy' : 'text-zinc-600 hover:text-navy'
                }`}
              >
                <User className="w-4 h-4" />
                {user.name.split(' ')[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-navy transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/submit"
              className="hidden sm:block px-5 py-2.5 bg-navy text-white rounded-full text-sm font-medium hover:bg-navy-light transition-colors"
            >
              List Property
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy hover:bg-zinc-100 rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-navy/5 text-navy'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/favorites"
              className={`flex items-center gap-2 py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                pathname === '/favorites'
                  ? 'bg-navy/5 text-navy'
                  : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Heart className="w-5 h-5" />
              Favorites
            </Link>
            {user ? (
              <Link
                href="/profile"
                className={`flex items-center gap-2 py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  pathname === '/profile'
                    ? 'bg-navy/5 text-navy'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 py-3 px-4 rounded-xl text-base font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            )}
            <Link
              href="/submit"
              className="block text-center py-3 px-6 bg-navy text-white rounded-xl text-base font-medium hover:bg-navy-light transition-colors mt-2"
            >
              List Property
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
