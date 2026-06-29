import type { Booking } from "@/types";

const BOOKINGS_KEY = "btb_bookings";

function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "BTB-";
  for (let i = 0; i < 6; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

function generateId(): string {
  return `bk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * TODO: Replace localStorage with Supabase/Firebase backend.
 * Example Supabase:
 *   const { data, error } = await supabase.from('bookings').insert({ ...booking })
 * Example Firebase:
 *   await addDoc(collection(db, 'bookings'), booking)
 */
export function getAllBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: Booking[]): void {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function getBookedSlots(date: string): string[] {
  return getAllBookings()
    .filter((b) => b.date === date && b.status === "confirmed")
    .map((b) => b.time);
}

export function createBooking(
  data: Omit<Booking, "id" | "reference" | "status" | "createdAt">
): Booking {
  const booking: Booking = {
    ...data,
    id: generateId(),
    reference: generateReference(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const bookings = getAllBookings();
  bookings.push(booking);
  saveBookings(bookings);

  // TODO: Send confirmation email via Resend/SendGrid
  // TODO: Sync to Supabase/Firebase

  return booking;
}

export function cancelBooking(referenceOrId: string): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex(
    (b) =>
      b.reference === referenceOrId ||
      b.id === referenceOrId ||
      b.customerEmail.toLowerCase() === referenceOrId.toLowerCase()
  );

  if (index === -1) return null;

  bookings[index] = { ...bookings[index], status: "cancelled" };
  saveBookings(bookings);

  // TODO: Notify backend and send cancellation email

  return bookings[index];
}

export function findBookings(query: string): Booking[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return getAllBookings().filter(
    (b) =>
      b.reference.toLowerCase() === q ||
      b.customerEmail.toLowerCase() === q ||
      b.reference.toLowerCase().includes(q)
  );
}

export function getBookingsByEmail(email: string): Booking[] {
  return getAllBookings().filter(
    (b) => b.customerEmail.toLowerCase() === email.toLowerCase()
  );
}

export function getUpcomingBookings(email: string): Booking[] {
  const today = new Date().toISOString().split("T")[0];
  return getBookingsByEmail(email)
    .filter((b) => b.status === "confirmed" && b.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
