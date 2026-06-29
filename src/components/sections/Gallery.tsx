"use client";

import { useState } from "react";
import { GALLERY_IMAGES } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Fresh Cuts. Sharp Details."
          subtitle="A showcase of precision barbering and premium grooming"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {GALLERY_IMAGES.map((image, i) => (
            <Reveal key={image.src} delay={i * 0.06}>
              <div
                className="relative aspect-[4/5] rounded-lg overflow-hidden gold-border-hover cursor-pointer group transition-transform duration-300 md:hover:scale-[1.02]"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PlaceholderImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className={`gallery-image object-cover object-center transition-transform duration-700 ${
                    hoveredIndex === i ? "md:scale-110" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
