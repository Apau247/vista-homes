// WARNING: This is a demo-only auth implementation using localStorage with a
// reversible Java-style bit-shift hash. DO NOT use in production.
// TODO: Integrate with a proper backend (e.g., NextAuth, Supabase, Firebase)
// and use bcrypt/argon2 for password hashing.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  favorites: string[];
  role: 'admin' | 'user';
  bio?: string;
  createdAt: string;
};

const USERS_KEY = 'vista-users';
const SESSION_KEY = 'vista-session';

function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

function generateId(): string {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const seed: User[] = [
      { id: 'u_seed1', name: 'John Doe', email: 'john@example.com', password: hashPassword('password123'), phone: '(310) 555-1001', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', favorites: ['1', '2'], role: 'user', createdAt: new Date().toISOString() },
      { id: 'u_seed2', name: 'Jane Smith', email: 'jane@example.com', password: hashPassword('password123'), phone: '(310) 555-1002', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', favorites: ['4'], role: 'user', createdAt: new Date().toISOString() },
      { id: 'u_seed3', name: 'Demo User', email: 'demo@vistahomes.com', password: hashPassword('demo123'), phone: '(310) 555-1003', avatar: 'https://randomuser.me/api/portraits/men/15.jpg', favorites: [], role: 'user', createdAt: new Date().toISOString() },
      { id: 'u_admin', name: 'Admin', email: 'admin@vistahomes.com', password: hashPassword('admin112233'), phone: '', avatar: 'https://ui-avatars.com/api/?name=Admin&background=0a2540&color=fff&size=150', favorites: [], role: 'admin', createdAt: new Date().toISOString() },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
    return seed;
  }
  const users: User[] = JSON.parse(raw);
  return users.map((u) => ({ ...u, role: u.role || 'user' }));
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): { user: Omit<User, 'password'> } | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginUser(email: string, password: string): { user: Omit<User, 'password'> } | null {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  if (user.password !== hashPassword(password)) return null;
  const { password: _, ...safe } = user;
  const session = { user: safe };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function registerUser(name: string, email: string, password: string): { user: Omit<User, 'password'> } | null {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return null;
  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    password: hashPassword(password),
    phone: '',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a2540&color=fff&size=150`,
    favorites: [],
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  const { password: _, ...safe } = newUser;
  const session = { user: safe };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutUser(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUserFavorites(userId: string, favorites: string[]): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return;
  users[idx].favorites = favorites;
  saveUsers(users);
  const { password: _, ...safe } = users[idx];
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user: safe }));
}

export function getAllUsers(): Omit<User, 'password'>[] {
  return getUsers().map(({ password: _, ...u }) => u);
}

export function createUser(
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'user' = 'user',
  extra?: { phone?: string; avatar?: string; bio?: string }
): Omit<User, 'password'> | null {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return null;
  const newUser: User = {
    id: generateId(),
    name,
    email: email.toLowerCase(),
    password: hashPassword(password),
    phone: extra?.phone || '',
    avatar: extra?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0a2540&color=fff&size=150`,
    favorites: [],
    role,
    bio: extra?.bio,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  const { password: _, ...safe } = newUser;
  return safe;
}

export function deleteUser(userId: string): boolean {
  if (userId.startsWith('u_admin')) return false;
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  users.splice(idx, 1);
  saveUsers(users);
  return true;
}

export function updateUserRole(userId: string, role: 'admin' | 'user'): boolean {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  users[idx].role = role;
  saveUsers(users);
  return true;
}

const ASSIGN_KEY = 'vista-property-assignments';

export function getPropertyAssignments(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(ASSIGN_KEY);
  return raw ? JSON.parse(raw) : {};
}

export function setPropertyAssignment(propertyId: string, userId: string): void {
  const assignments = getPropertyAssignments();
  assignments[propertyId] = userId;
  localStorage.setItem(ASSIGN_KEY, JSON.stringify(assignments));
}

export function removePropertyAssignment(propertyId: string): void {
  const assignments = getPropertyAssignments();
  delete assignments[propertyId];
  localStorage.setItem(ASSIGN_KEY, JSON.stringify(assignments));
}

export function updateUserProfile(userId: string, updates: Partial<Omit<User, 'id' | 'password' | 'favorites'>>): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return;
  users[idx] = { ...users[idx], ...updates };
  saveUsers(users);
  const { password: _, ...safe } = users[idx];
  localStorage.setItem(SESSION_KEY, JSON.stringify({ user: safe }));
}
