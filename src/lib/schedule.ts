import type { OpeningHours } from "@/types";
import { OPENING_HOURS } from "./data";

const DAY_MAP: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d+):(\d+)(am|pm)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toLowerCase();
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function formatTimeSlot(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? "pm" : "am";
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayHour}:${m.toString().padStart(2, "0")}${period}`;
}

export function getOpeningHoursForDate(date: Date): OpeningHours | undefined {
  const dayName = DAY_MAP[date.getDay()];
  return OPENING_HOURS.find((h) => h.day === dayName);
}

export function generateTimeSlots(date: Date, duration: number): string[] {
  const hours = getOpeningHoursForDate(date);
  if (!hours || hours.closed) return [];

  const parts = hours.hours.split(" – ");
  if (parts.length !== 2) return [];

  const start = parseTime(parts[0].trim());
  const end = parseTime(parts[1].trim());
  const slots: string[] = [];
  const interval = 30;

  for (let time = start; time + duration <= end; time += interval) {
    slots.push(formatTimeSlot(time));
  }

  return slots;
}

export function isDateBookable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const check = new Date(date);
  check.setHours(0, 0, 0, 0);
  if (check < today) return false;
  const hours = getOpeningHoursForDate(date);
  return !!hours && !hours.closed;
}

export function getBookableDates(daysAhead = 60): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i <= daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (isDateBookable(date)) dates.push(date);
  }

  return dates;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function toISODate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
