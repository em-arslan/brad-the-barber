"use client";

import { useState } from "react";
import { SERVICES, ADDRESS, SOCIAL, SITE_EMAIL, SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { validateEmail, validatePhone } from "@/lib/utils";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

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
    // TODO: Connect to backend email service (Resend, Formspree, Supabase)
    await new Promise((r) => setTimeout(r, 800));
    showToast("Message sent! We'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="We'd love to hear from you"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="premium-card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm text-muted mb-2">
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-charcoal border border-border rounded-sm px-4 py-3 text-white text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-muted mb-2">
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-charcoal border border-border rounded-sm px-4 py-3 text-white text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-phone" className="block text-sm text-muted mb-2">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-charcoal border border-border rounded-sm px-4 py-3 text-white text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-service" className="block text-sm text-muted mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-charcoal border border-border rounded-sm px-4 py-3 text-white text-sm"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-muted mb-2">
                  Message <span className="text-gold">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-charcoal border border-border rounded-sm px-4 py-3 text-white text-sm resize-none"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2 space-y-6">
            <div className="premium-card p-6 gold-border-hover">
              <h3 className="font-serif text-lg text-white mb-4">Contact Details</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <span className="text-gold text-xs tracking-widest uppercase block mb-1">Phone</span>
                  <a href={`tel:${SITE_PHONE}`} className="text-white hover:text-gold transition-colors">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <span className="text-gold text-xs tracking-widest uppercase block mb-1">Email</span>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-white hover:text-gold transition-colors">
                    {SITE_EMAIL}
                  </a>
                </li>
                <li>
                  <span className="text-gold text-xs tracking-widest uppercase block mb-1">Address</span>
                  <p className="text-muted">
                    {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.postcode}
                  </p>
                </li>
              </ul>
            </div>

            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-card p-6 gold-border-hover flex items-center gap-4 group block"
            >
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">WhatsApp Us</p>
                <p className="text-muted text-sm">Quick message for enquiries</p>
              </div>
            </a>

            <div className="premium-card p-6 gold-border-hover">
              <h3 className="font-serif text-lg text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold text-sm transition-colors">
                  Facebook: brad.the.barber
                </a>
              </div>
              <div className="mt-2">
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold text-sm transition-colors">
                  Instagram: brad_the_barber1
                </a>
              </div>
              <div className="mt-2">
                <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-gold text-sm transition-colors">
                  TikTok: brad_the_barber1
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
