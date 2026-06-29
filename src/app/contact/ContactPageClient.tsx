"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SERVICES,
  ADDRESS,
  OPENING_HOURS,
  SOCIAL,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
  SITE_URL,
  OUTLET_IMAGE,
} from "@/lib/data";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { useToast } from "@/components/ui/Toast";
import { validateEmail, validatePhone } from "@/lib/utils";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function ContactPageClient() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.full)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    if (!validateEmail(form.email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    if (form.phone && !validatePhone(form.phone)) {
      showToast("Please enter a valid UK phone number.", "error");
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    showToast("Message sent! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setSubmitting(false);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Contact", url: `${SITE_URL}/contact` },
            ])
          ),
        }}
      />

      <section className="pt-32 pb-16 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">Contact Us</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white tracking-wide mb-6">
              Get In Touch
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Have a question or want to enquire about our services? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Outlet / shop front */}
      <section className="py-12 md:py-16 bg-deep-black border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3">Our Shop</p>
            <h2 className="font-serif text-2xl md:text-3xl text-white tracking-wide">
              Visit Us on Hargreaves Street
            </h2>
            <p className="text-muted text-sm md:text-base mt-3 max-w-xl mx-auto">
              Find BRAD.THE.BARBER at our Burnley shop — premium barbering in a welcoming, professional setting.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-gold/30 via-gold/10 to-gold/25 pointer-events-none" />
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-gold/20 shadow-2xl shadow-black/50">
              <PlaceholderImage
                src={OUTLET_IMAGE.src}
                alt={OUTLET_IMAGE.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                loading="lazy"
                className="outlet-image object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="font-serif text-white text-sm sm:text-base tracking-wide">{ADDRESS.name}</p>
                  <p className="text-muted text-xs sm:text-sm">{ADDRESS.street}, {ADDRESS.city} {ADDRESS.postcode}</p>
                </div>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="sm">Get Directions</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="premium-card p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted mb-2">Name *</label>
                    <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-muted mb-2">Email *</label>
                    <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-muted mb-2">Phone</label>
                    <input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm text-muted mb-2">Service</label>
                    <select id="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm">
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-muted mb-2">Message *</label>
                  <textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm resize-none" required />
                </div>
                <Button type="submit" variant="primary" size="lg" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="premium-card p-6 gold-border-hover">
                <h2 className="font-serif text-lg text-white mb-4">Location</h2>
                <address className="not-italic text-muted text-sm leading-relaxed">
                  {ADDRESS.street}<br />
                  {ADDRESS.city}, {ADDRESS.county}<br />
                  {ADDRESS.postcode}
                </address>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                  <Button variant="outline" size="sm">Get Directions</Button>
                </a>
              </div>

              <div className="premium-card p-6 gold-border-hover">
                <h2 className="font-serif text-lg text-white mb-4">Opening Hours</h2>
                <ul className="space-y-2 text-sm">
                  {OPENING_HOURS.map((h) => (
                    <li key={h.day} className="flex justify-between">
                      <span className="text-muted">{h.day}</span>
                      <span className={h.closed ? "text-muted/50" : "text-white"}>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card p-6 gold-border-hover space-y-3">
                <a href={`tel:${SITE_PHONE}`} className="block text-white hover:text-gold transition-colors">{SITE_PHONE_DISPLAY}</a>
                <a href={`mailto:${SITE_EMAIL}`} className="block text-muted hover:text-gold transition-colors text-sm">{SITE_EMAIL}</a>
                <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-green-400 hover:text-green-300 text-sm">WhatsApp</a>
              </div>

              <div className="map-placeholder rounded-lg overflow-hidden aspect-video relative">
                <iframe
                  title="BRAD.THE.BARBER location map"
                  src="https://maps.google.com/maps?q=16+Hargreaves+St,+Burnley+BB11+1DZ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/#booking">
              <Button variant="secondary" size="lg">Book Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
