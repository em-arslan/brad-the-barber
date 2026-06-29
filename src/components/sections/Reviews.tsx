"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REVIEWS } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      setMobileIndex((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section id="reviews" className="section-padding bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Feedback from our valued clients across Burnley"
        />

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <article key={review.id} className="premium-card p-6 gold-border-hover">
              <Stars count={review.rating} />
              <blockquote className="text-muted text-sm leading-relaxed my-4 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer>
                <p className="text-white font-medium text-sm">{review.name}</p>
                <p className="text-muted/60 text-xs mt-1">{review.date}</p>
              </footer>
            </article>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={mobileIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="premium-card p-6 gold-border-hover"
            >
              <Stars count={REVIEWS[mobileIndex].rating} />
              <blockquote className="text-muted text-sm leading-relaxed my-4 italic">
                &ldquo;{REVIEWS[mobileIndex].text}&rdquo;
              </blockquote>
              <footer>
                <p className="text-white font-medium text-sm">{REVIEWS[mobileIndex].name}</p>
                <p className="text-muted/60 text-xs mt-1">{REVIEWS[mobileIndex].date}</p>
              </footer>
            </motion.article>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMobileIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === mobileIndex ? "w-6 bg-gold" : "w-2 bg-white/30"
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
