export type ServiceCategory = "gents" | "ladies" | "children" | "grooming" | "waxing";

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: ServiceCategory;
  description: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface Booking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export type BookingStep =
  | "service"
  | "barber"
  | "date"
  | "time"
  | "details"
  | "confirm"
  | "success";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}
