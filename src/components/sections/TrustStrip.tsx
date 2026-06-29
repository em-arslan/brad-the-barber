import { TRUST_ITEMS } from "@/lib/data";

export default function TrustStrip() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section className="bg-deep-black border-y border-gold/10 py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <div key={i} className="flex items-center mx-8 shrink-0">
            <span className="text-gold mr-3">&#9733;</span>
            <span className="text-white text-sm tracking-[0.15em] uppercase font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
