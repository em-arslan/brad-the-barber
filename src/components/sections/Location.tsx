import { ADDRESS, OPENING_HOURS, SITE_PHONE } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function Location() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.full)}`;

  return (
    <section id="location" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Visit Us in Burnley"
          subtitle="Conveniently located on Hargreaves Street"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Reveal>
            <div className="premium-card p-8 gold-border-hover h-full">
              <h3 className="font-serif text-2xl text-white mb-6 tracking-wide">
                {ADDRESS.name}
              </h3>
              <address className="not-italic text-muted leading-relaxed mb-8">
                {ADDRESS.street}<br />
                {ADDRESS.city}<br />
                {ADDRESS.county}<br />
                {ADDRESS.postcode}
              </address>

              <h4 className="text-gold text-xs tracking-[0.25em] uppercase mb-4">Opening Hours</h4>
              <ul className="space-y-3 mb-8">
                {OPENING_HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between text-sm border-b border-border/50 pb-2">
                    <span className="text-muted">{h.day}</span>
                    <span className={h.closed ? "text-muted/50" : "text-white"}>{h.hours}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Get Directions
                  </Button>
                </a>
                <a href={`tel:${SITE_PHONE}`}>
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="map-placeholder rounded-lg overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] relative">
              {/* Replace with real Google Maps embed when ready */}
              <iframe
                title="BRAD.THE.BARBER location map"
                src="https://maps.google.com/maps?q=16+Hargreaves+St,+Burnley+BB11+1DZ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.1]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
