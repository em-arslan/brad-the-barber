"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SERVICES,
  BARBERS,
  getServiceById,
  getBarberById,
  formatPrice,
} from "@/lib/data";
import {
  getBookableDates,
  generateTimeSlots,
  formatDisplayDate,
  formatShortDate,
  toISODate,
  parseISODate,
} from "@/lib/schedule";
import { createBooking, getBookedSlots, cancelBooking, findBookings } from "@/lib/booking";
import type { Booking, BookingStep } from "@/types";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { validateEmail, validatePhone } from "@/lib/utils";

const STEPS: { key: BookingStep; label: string }[] = [
  { key: "service", label: "Service" },
  { key: "barber", label: "Barber" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "details", label: "Details" },
  { key: "confirm", label: "Confirm" },
];

interface BookingFlowProps {
  preselectedServiceId?: string;
}

export default function BookingFlow({ preselectedServiceId }: BookingFlowProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<"book" | "find">("book");
  const [step, setStep] = useState<BookingStep>("service");
  const [serviceId, setServiceId] = useState(preselectedServiceId || "");
  const [barberId, setBarberId] = useState("any");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [findQuery, setFindQuery] = useState("");
  const [foundBookings, setFoundBookings] = useState<Booking[]>([]);

  const bookableDates = getBookableDates();
  const service = getServiceById(serviceId);
  const barber = getBarberById(barberId);
  const timeSlots = selectedDate && service
    ? generateTimeSlots(selectedDate, service.duration).filter(
        (t) => !getBookedSlots(toISODate(selectedDate)).includes(t)
      )
    : [];

  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
      setStep("barber");
    }
  }, [preselectedServiceId]);

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.key);
  };

  const goBack = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev.key);
  };

  const handleConfirm = () => {
    if (!service || !barber || !selectedDate || !selectedTime) return;
    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      showToast("Please complete all contact details.", "error");
      return;
    }
    if (!validateEmail(customer.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    if (!validatePhone(customer.phone)) {
      showToast("Please enter a valid UK phone number.", "error");
      return;
    }

    const booking = createBooking({
      serviceId: service.id,
      serviceName: service.name,
      barberId: barber.id,
      barberName: barber.name,
      date: toISODate(selectedDate),
      time: selectedTime,
      duration: service.duration,
      price: service.price,
      customerName: customer.name.trim(),
      customerEmail: customer.email.trim().toLowerCase(),
      customerPhone: customer.phone.trim(),
    });

    setConfirmedBooking(booking);
    setStep("success");
    showToast("Appointment confirmed!");
  };

  const handleFind = () => {
    if (!findQuery.trim()) {
      showToast("Enter your email or booking reference.", "error");
      return;
    }
    const results = findBookings(findQuery.trim());
    setFoundBookings(results);
    if (results.length === 0) {
      showToast("No appointments found.", "error");
    }
  };

  const handleCancel = (reference: string) => {
    const cancelled = cancelBooking(reference);
    if (cancelled) {
      showToast("Appointment cancelled.");
      setFoundBookings((prev) =>
        prev.map((b) =>
          b.reference === reference ? { ...b, status: "cancelled" as const } : b
        )
      );
    } else {
      showToast("Could not cancel appointment.", "error");
    }
  };

  const resetBooking = () => {
    setStep("service");
    setServiceId("");
    setBarberId("any");
    setSelectedDate(null);
    setSelectedTime("");
    setCustomer({ name: "", email: "", phone: "" });
    setConfirmedBooking(null);
  };

  return (
    <section id="booking" className="section-padding bg-charcoal">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Your Appointment"
          subtitle="Reserve your slot in a few simple steps"
        />

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={mode === "book" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setMode("book")}
          >
            Book Appointment
          </Button>
          <Button
            variant={mode === "find" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setMode("find")}
          >
            Find My Appointment
          </Button>
        </div>

        {mode === "find" ? (
          <div className="premium-card p-6 md:p-8">
            <h3 className="font-serif text-xl text-white mb-4">Find My Appointment</h3>
            <p className="text-muted text-sm mb-6">
              Enter your email address or booking reference to view or cancel your appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                value={findQuery}
                onChange={(e) => setFindQuery(e.target.value)}
                placeholder="Email or booking reference (e.g. BTB-XXXXXX)"
                className="flex-1 bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm"
              />
              <Button variant="primary" size="md" onClick={handleFind}>
                Find My Appointment
              </Button>
            </div>

            {foundBookings.length > 0 && (
              <div className="space-y-4">
                {foundBookings.map((b) => (
                  <div
                    key={b.id}
                    className={`p-5 rounded-lg border ${
                      b.status === "cancelled"
                        ? "border-red-500/30 bg-red-950/20"
                        : "border-gold/30 bg-deep-black"
                    }`}
                  >
                    <div className="flex flex-wrap justify-between gap-2 mb-3">
                      <span className="text-gold font-mono text-sm">{b.reference}</span>
                      <span
                        className={`text-xs uppercase tracking-widest ${
                          b.status === "cancelled" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-white font-medium">{b.serviceName}</p>
                    <p className="text-muted text-sm mt-1">
                      {formatDisplayDate(parseISODate(b.date))} at {b.time}
                    </p>
                    <p className="text-muted text-sm">Barber: {b.barberName}</p>
                    {b.status === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => handleCancel(b.reference)}
                      >
                        Cancel Appointment
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="premium-card p-6 md:p-8">
            {step !== "success" && (
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.key}
                      className={`text-xs tracking-wide hidden sm:block ${
                        i <= stepIndex ? "text-gold" : "text-muted/40"
                      }`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
                <div className="h-1 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gold-gradient-bg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === "service" && (
                <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Choose Your Service</h3>
                  <p className="text-muted text-sm mb-6">Select the treatment you&apos;d like to book.</p>
                  <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setServiceId(s.id); goNext(); }}
                        className={`text-left p-4 rounded-lg border transition-all ${
                          serviceId === s.id
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/40 bg-deep-black"
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="text-white text-sm font-medium">{s.name}</span>
                          <span className="text-gold text-sm">{formatPrice(s.price)}</span>
                        </div>
                        <span className="text-muted text-xs">{s.duration} min</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "barber" && (
                <motion.div key="barber" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Select Your Barber</h3>
                  <p className="text-muted text-sm mb-6">Choose a preferred barber or let us assign one.</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {BARBERS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => { setBarberId(b.id); goNext(); }}
                        className={`p-5 rounded-lg border text-center transition-all ${
                          barberId === b.id
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/40 bg-deep-black"
                        }`}
                      >
                        <p className="text-white font-medium">{b.name}</p>
                        <p className="text-muted text-xs mt-1">{b.role}</p>
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-6" onClick={goBack}>Back</Button>
                </motion.div>
              )}

              {step === "date" && (
                <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Select a Date</h3>
                  <p className="text-muted text-sm mb-6">Pick your preferred appointment date.</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-[320px] overflow-y-auto">
                    {bookableDates.slice(0, 30).map((date) => (
                      <button
                        key={toISODate(date)}
                        type="button"
                        onClick={() => { setSelectedDate(date); setSelectedTime(""); goNext(); }}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          selectedDate && toISODate(selectedDate) === toISODate(date)
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/40 bg-deep-black"
                        }`}
                      >
                        <p className="text-white text-xs font-medium">{formatShortDate(date)}</p>
                      </button>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-6" onClick={goBack}>Back</Button>
                </motion.div>
              )}

              {step === "time" && (
                <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Select a Time</h3>
                  <p className="text-muted text-sm mb-6">
                    {selectedDate && formatDisplayDate(selectedDate)}
                  </p>
                  {timeSlots.length === 0 ? (
                    <p className="text-muted text-sm">No available slots for this date. Please choose another date.</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => { setSelectedTime(time); goNext(); }}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedTime === time
                              ? "border-gold bg-gold/5 text-gold"
                              : "border-border hover:border-gold/40 bg-deep-black text-white"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="mt-6" onClick={goBack}>Back</Button>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Your Details</h3>
                  <p className="text-muted text-sm mb-6">Enter your contact information to confirm.</p>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm text-muted mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted mb-2">Email *</label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm"
                        placeholder="07XXX XXXXXX"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="ghost" size="sm" onClick={goBack}>Back</Button>
                    <Button variant="primary" size="md" onClick={goNext}>Continue</Button>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && service && barber && selectedDate && (
                <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-serif text-xl text-white mb-2">Confirm Your Booking</h3>
                  <p className="text-muted text-sm mb-6">Review your appointment details before confirming.</p>
                  <div className="bg-deep-black rounded-lg border border-gold/20 p-6 space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Service</span>
                      <span className="text-white">{service.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Barber</span>
                      <span className="text-white">{barber.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Date</span>
                      <span className="text-white">{formatDisplayDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Time</span>
                      <span className="text-white">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Duration</span>
                      <span className="text-white">{service.duration} minutes</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-border pt-3">
                      <span className="text-muted">Total</span>
                      <span className="text-gold font-semibold text-lg">{formatPrice(service.price)}</span>
                    </div>
                    <div className="border-t border-border pt-3 space-y-1">
                      <p className="text-sm text-white">{customer.name}</p>
                      <p className="text-sm text-muted">{customer.email}</p>
                      <p className="text-sm text-muted">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" onClick={goBack}>Back</Button>
                    <Button variant="secondary" size="lg" onClick={handleConfirm}>
                      Reserve Your Slot
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "success" && confirmedBooking && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gold flex items-center justify-center">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">Appointment Confirmed</h3>
                  <p className="text-muted text-sm mb-6">
                    Your booking reference is{" "}
                    <span className="text-gold font-mono">{confirmedBooking.reference}</span>
                  </p>
                  <div className="bg-deep-black rounded-lg border border-gold/20 p-6 text-left max-w-sm mx-auto mb-8 space-y-2 text-sm">
                    <p><span className="text-muted">Service:</span> <span className="text-white">{confirmedBooking.serviceName}</span></p>
                    <p><span className="text-muted">Date:</span> <span className="text-white">{formatDisplayDate(parseISODate(confirmedBooking.date))}</span></p>
                    <p><span className="text-muted">Time:</span> <span className="text-white">{confirmedBooking.time}</span></p>
                    <p><span className="text-muted">Barber:</span> <span className="text-white">{confirmedBooking.barberName}</span></p>
                  </div>
                  <Button variant="primary" size="md" onClick={resetBooking}>
                    Book Another Appointment
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
