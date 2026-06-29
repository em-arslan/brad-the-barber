import type { User } from "@/types";

const USERS_KEY = "btb_users";
const SESSION_KEY = "btb_session";

/**
 * TODO: Replace with Supabase Auth, Firebase Auth, or NextAuth.
 *
 * Supabase example:
 *   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
 *   const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
 *
 * Firebase example:
 *   await signInWithEmailAndPassword(auth, email, password)
 *   await signInWithPopup(auth, googleProvider)
 *
 * NextAuth example:
 *   signIn('google') or signIn('credentials', { email, password })
 */

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setSession(user: User | null): void {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function registerUser(email: string, name: string): User {
  const users = getUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const user: User = {
    id: `usr_${Date.now()}`,
    email: email.toLowerCase(),
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);
  setSession(user);
  return user;
}

export function loginUser(email: string): User | null {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    // Auto-register for mock demo
    return registerUser(email, email.split("@")[0]);
  }
  setSession(user);
  return user;
}

export function logoutUser(): void {
  setSession(null);
}

export function loginWithGoogleMock(): User {
  return registerUser("client@gmail.com", "Google User");
}
