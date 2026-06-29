"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_IMAGES } from "@/lib/data";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";

const SLIDE_DURATION_MS = 5500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0, 1]));

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % HERO_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  // Preload current + next slide only — never all 7 at once
  useEffect(() => {
    const nextIndex = (current + 1) % HERO_IMAGES.length;
    const prevIndex = (current - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
    setLoadedSlides((prev) => {
      const updated = new Set(prev);
      updated.add(current);
      updated.add(nextIndex);
      updated.add(prevIndex);
      return updated;
    });
  }, [current]);

  const visibleSlides = useMemo(() => {
    return HERO_IMAGES.map((image, index) => ({ image, index })).filter(
      ({ index }) => loadedSlides.has(index)
    );
  }, [loadedSlides]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
    >
      <div className="absolute inset-0">
        {visibleSlides.map(({ image, index }) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              index === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
            aria-hidden={index !== current}
          >
            <div
              key={index === current ? `active-${current}` : `idle-${index}`}
              className={`absolute inset-0 ${index === current ? "hero-ken-burns" : ""}`}
            >
              <PlaceholderImage
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 hero-overlay z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-6"
          >
            Burnley&apos;s Premium Barber
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-wide mb-6"
          >
            Premium Barbering in{" "}
            <span className="gold-gradient-text">Burnley</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-muted text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Sharp fades, clean trims, hot towel shaves and luxury grooming for gents, ladies and children.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/#booking">
              <Button variant="primary" size="lg">
                Book Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg">
                View Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="hidden md:flex absolute inset-y-0 left-4 right-4 z-20 items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={prev}
          className="pointer-events-auto w-12 h-12 rounded-full border border-gold/30 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="pointer-events-auto w-12 h-12 rounded-full border border-gold/30 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
