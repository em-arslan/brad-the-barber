import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function About() {
  return (
    <section id="about" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Crafted With Precision"
          subtitle="Modern barbering for the discerning client"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              {/* Gold accent frame */}
              <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-gold/40 via-gold/10 to-gold/30 pointer-events-none" />

              <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-gold/25 shadow-2xl shadow-black/60">
                <PlaceholderImage
                  src="/assets/images/brad-barber.webp"
                  alt="Brad, senior barber at BRAD.THE.BARBER Burnley"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="about-barber-image object-cover"
                />

                {/* Premium overlays — moody grade + vignette + bottom fade */}
                <div className="absolute inset-0 about-barber-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/10 opacity-95 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-charcoal/40 pointer-events-none" />

                {/* Brand strip */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 border-t border-gold/20 bg-charcoal/75 backdrop-blur-sm">
                  <p className="font-serif text-lg sm:text-xl gold-gradient-text tracking-[0.2em] uppercase">
                    BRAD.THE.BARBER
                  </p>
                  <p className="text-muted text-xs tracking-[0.25em] uppercase mt-1">
                    Senior Barber · Burnley
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-gold/15 rounded-lg -z-10 hidden sm:block" />
              <div className="absolute -top-3 -left-3 w-20 h-20 border border-gold/10 rounded-lg -z-10 hidden sm:block" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-muted text-base md:text-lg leading-relaxed">
                <strong className="text-white font-medium">BRAD.THE.BARBER</strong> delivers modern barbering with precision, style and attention to detail. From clean fades and beard trims to hot towel shaves and children&apos;s haircuts, every appointment is designed to feel sharp, relaxed and professional.
              </p>
              <p className="text-muted text-base leading-relaxed">
                Based in the heart of Burnley, we welcome ladies, gents and children into a friendly, premium environment where quality craftsmanship meets genuine hospitality.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Location", value: "Burnley, Lancashire" },
                  { label: "Clients", value: "Ladies, Gents & Children" },
                  { label: "Experience", value: "Premium & Friendly" },
                  { label: "Booking", value: "Easy Online" },
                ].map((item) => (
                  <div key={item.label} className="premium-card p-4 gold-border-hover">
                    <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
