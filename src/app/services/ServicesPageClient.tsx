"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SERVICES,
  formatPrice,
  getCategoryLabel,
  SITE_URL,
} from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { getBreadcrumbSchema } from "@/lib/seo";

export default function ServicesPageClient() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(SERVICES.map((s) => s.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesSearch =
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || s.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: SITE_URL },
              { name: "Services", url: `${SITE_URL}/services` },
            ])
          ),
        }}
      />

      <section className="pt-32 pb-16 bg-deep-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-gold text-xs tracking-[0.35em] uppercase mb-4">Our Menu</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-6">
              Premium Services
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Expert barbering for ladies, gents and children. Every service delivered with precision and care.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="flex-1 bg-deep-black border border-border rounded-sm px-4 py-3 text-white text-sm"
              aria-label="Search services"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase rounded-sm border transition-colors ${
                    filter === cat
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-border text-muted hover:border-gold/40"
                  }`}
                >
                  {cat === "all" ? "All" : getCategoryLabel(cat as (typeof SERVICES)[0]["category"])}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.03}>
                <article className="premium-card p-6 md:p-8 gold-border-hover flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-serif text-xl text-white tracking-wide">{service.name}</h2>
                      <span className="text-xs tracking-widest uppercase text-gold/70 border border-gold/20 px-2 py-0.5 rounded">
                        {getCategoryLabel(service.category)}
                      </span>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-2">{service.description}</p>
                    <p className="text-muted/60 text-xs">{service.duration} minutes</p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className="font-serif text-2xl text-gold">{formatPrice(service.price)}</span>
                    <Link href="/#booking">
                      <Button variant="primary" size="md">Book</Button>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <p className="text-muted text-center py-12">No services match your search.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-deep-black border-t border-gold/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-wide">
            Ready for your next sharp look?
          </h2>
          <p className="text-muted mb-8">Book your appointment online in minutes.</p>
          <Link href="/#booking">
            <Button variant="secondary" size="lg">Book Appointment</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
