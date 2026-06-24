'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, getSession, updateUserFavorites, updateUserProfile, type User } from '@/lib/auth';

type SessionUser = Omit<User, 'password'>;

interface AuthContextType {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  updateProfile: (updates: Partial<Pick<SessionUser, 'name' | 'phone' | 'avatar'>>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session.user);
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const result = loginUser(email, password);
    if (!result) return { success: false, error: 'Invalid email or password' };
    setUser(result.user);
    return { success: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const result = registerUser(name, email, password);
    if (!result) return { success: false, error: 'Email already in use' };
    setUser(result.user);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  const addFavorite = useCallback((propertyId: string) => {
    if (!user) return;
    const updated = [...new Set([...user.favorites, propertyId])];
    updateUserFavorites(user.id, updated);
    setUser({ ...user, favorites: updated });
  }, [user]);

  const removeFavorite = useCallback((propertyId: string) => {
    if (!user) return;
    const updated = user.favorites.filter((id) => id !== propertyId);
    updateUserFavorites(user.id, updated);
    setUser({ ...user, favorites: updated });
  }, [user]);

  const isFavorite = useCallback((propertyId: string) => {
    return user?.favorites.includes(propertyId) ?? false;
  }, [user]);

  const updateProfile = useCallback((updates: Partial<Pick<SessionUser, 'name' | 'phone' | 'avatar'>>) => {
    if (!user) return;
    updateUserProfile(user.id, updates);
    setUser({ ...user, ...updates });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, addFavorite, removeFavorite, isFavorite, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
