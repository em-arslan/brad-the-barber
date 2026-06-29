"use client";

import Link from "next/link";
import { SERVICES, formatPrice } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

interface ServicesPreviewProps {
  onBookService?: (serviceId: string) => void;
}

export default function ServicesPreview({ onBookService }: ServicesPreviewProps) {
  return (
    <section id="services-preview" className="section-padding bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Premium grooming tailored to every client"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
              <article className="premium-card p-6 h-full flex flex-col gold-border-hover group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-lg text-white tracking-wide group-hover:text-gold transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-gold font-semibold text-lg shrink-0 ml-2">
                    {formatPrice(service.price)}
                  </span>
                </div>
                <p className="text-muted text-xs tracking-wide mb-3">
                  {service.duration} minutes
                </p>
                <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onBookService?.(service.id)}
                >
                  Book
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link href="/services">
            <Button variant="secondary" size="lg">
              View All Services
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
