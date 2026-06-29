"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  loginUser,
  logoutUser,
  registerUser,
  loginWithGoogleMock,
  getSession,
} from "@/lib/auth";
import { getUpcomingBookings, cancelBooking } from "@/lib/booking";
import { formatDisplayDate, parseISODate } from "@/lib/schedule";
import type { Booking, User } from "@/types";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { validateEmail } from "@/lib/utils";

type AuthView = "login" | "register" | "forgot";

export default function LoginPageClient() {
  const { showToast } = useToast();
  const [view, setView] = useState<AuthView>("login");
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
      setAppointments(getUpcomingBookings(session.email));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      showToast("Please enter a valid email.", "error");
      return;
    }
    // TODO: Replace with Supabase/Firebase/NextAuth authentication
    const loggedIn = loginUser(email);
    if (loggedIn) {
      setUser(loggedIn);
      setAppointments(getUpcomingBookings(loggedIn.email));
      showToast("Welcome back!");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !validateEmail(email)) {
      showToast("Please complete all fields.", "error");
      return;
    }
    // TODO: Replace with real registration backend
    const registered = registerUser(email, name);
    setUser(registered);
    setAppointments(getUpcomingBookings(registered.email));
    showToast("Account created successfully!");
  };

  const handleGoogleLogin = () => {
    // TODO: Connect Supabase Auth signInWithOAuth({ provider: 'google' })
    const googleUser = loginWithGoogleMock();
    setUser(googleUser);
    setAppointments(getUpcomingBookings(googleUser.email));
    showToast("Signed in with Google");
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setAppointments([]);
    showToast("Logged out.");
  };

  const handleCancel = (reference: string) => {
    cancelBooking(reference);
    if (user) {
      setAppointments(getUpcomingBookings(user.email));
    }
    showToast("Appointment cancelled.");
  };

  if (user) {
    return (
      <section className="pt-32 pb-20 min-h-screen bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-3xl text-white tracking-wide">Member Area</h1>
              <p className="text-muted text-sm mt-1">Welcome, {user.name}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>

          <div className="premium-card p-6 md:p-8">
            <h2 className="font-serif text-xl text-white mb-6">Your Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted mb-6">No upcoming appointments found.</p>
                <Link href="/#booking">
                  <Button variant="primary" size="md">Book Appointment</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((b) => (
                  <div key={b.id} className="p-5 rounded-lg border border-gold/20 bg-deep-black">
                    <div className="flex justify-between mb-2">
                      <span className="text-gold font-mono text-sm">{b.reference}</span>
                      <span className="text-green-400 text-xs uppercase tracking-widest">{b.status}</span>
                    </div>
                    <p className="text-white font-medium">{b.serviceName}</p>
                    <p className="text-muted text-sm mt-1">
                      {formatDisplayDate(parseISODate(b.date))} at {b.time}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={() => handleCancel(b.reference)}>
                      Cancel Appointment
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 min-h-screen bg-charcoal">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">Member Area</p>
          <h1 className="font-serif text-3xl text-white tracking-wide">
            {view === "login" ? "Sign In" : view === "register" ? "Create Account" : "Reset Password"}
          </h1>
        </motion.div>

        <div className="premium-card p-6 md:p-8">
          {view === "forgot" ? (
            <form onSubmit={(e) => { e.preventDefault(); showToast("Password reset link sent (mock)."); setView("login"); }}>
              <p className="text-muted text-sm mb-6">Enter your email and we&apos;ll send a reset link.</p>
              <div className="mb-4">
                <label className="block text-sm text-muted mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full mb-4">Send Reset Link</Button>
              <button type="button" onClick={() => setView("login")} className="text-gold text-sm hover:underline w-full text-center">Back to Sign In</button>
            </form>
          ) : view === "register" ? (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-sm text-muted mb-2">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-muted mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
              </div>
              <div className="mb-6">
                <label className="block text-sm text-muted mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
              </div>
              <Button type="submit" variant="primary" size="md" className="w-full mb-4">Create Account</Button>
              <button type="button" onClick={() => setView("login")} className="text-gold text-sm hover:underline w-full text-center">Already have an account? Sign In</button>
            </form>
          ) : (
            <>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm text-muted mb-2">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-muted mb-2">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" />
                </div>
                <button type="button" onClick={() => setView("forgot")} className="text-gold text-xs hover:underline mb-6 block">Forgot password?</button>
                <Button type="submit" variant="primary" size="md" className="w-full mb-4">Sign In</Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="bg-card px-3 text-muted text-xs">or</span></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-sm text-white text-sm hover:border-gold/40 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button type="button" onClick={() => setView("register")} className="text-gold text-sm hover:underline w-full text-center mt-6 block">
                Don&apos;t have an account? Register
              </button>
            </>
          )}
        </div>

        <p className="text-muted/50 text-xs text-center mt-6">
          {/* TODO: Connect Supabase Auth, Firebase Auth, or NextAuth for production authentication */}
          Mock authentication — connect your auth provider for production.
        </p>
      </div>
    </section>
  );
}
