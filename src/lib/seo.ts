import {
  ADDRESS,
  FAQ_ITEMS,
  OPENING_HOURS,
  SERVICES,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
  SITE_URL,
} from "./data";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "BarberShop"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description:
      "Premium barbering in Burnley offering haircuts, beard trims, hot towel shaves and grooming for ladies, gents and children.",
    url: SITE_URL,
    telephone: `+44${SITE_PHONE.replace(/^0/, "")}`,
    email: SITE_EMAIL,
    image: `${SITE_URL}/assets/images/og-image.jpg`,
    logo: `${SITE_URL}/assets/logo/logo.jpeg`,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.county,
      postalCode: ADDRESS.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.789,
      longitude: -2.248,
    },
    openingHoursSpecification: OPENING_HOURS.filter((h) => !h.closed).map(
      (h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.hours.split(" – ")[0]?.replace(/am|pm/gi, "").trim(),
        closes: h.hours.split(" – ")[1]?.replace(/am|pm/gi, "").trim(),
      })
    ),
    sameAs: [
      "https://www.facebook.com/brad.the.barber",
      "https://www.instagram.com/brad_the_barber1",
      "https://www.tiktok.com/@brad_the_barber1",
    ],
    areaServed: {
      "@type": "City",
      name: "Burnley",
    },
  };
}

export function getServiceSchema() {
  return SERVICES.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "BarberShop",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: service.price,
      priceCurrency: "GBP",
    },
    areaServed: "Burnley, Lancashire, UK",
  }));
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_URL}/#booking`,
      name: "Book Appointment",
    },
  };
}

export const DEFAULT_METADATA = {
  title: "BRAD.THE.BARBER Burnley | Premium Barber, Haircuts & Beard Trims",
  description:
    "Book premium haircuts, beard trims, hot towel shaves and grooming appointments at BRAD.THE.BARBER in Burnley. Easy online booking for gents, ladies and children.",
  keywords: [
    "barber Burnley",
    "haircut Burnley",
    "beard trim Burnley",
    "hot towel shave",
    "BRAD.THE.BARBER",
    "premium barber Lancashire",
    "gents haircut",
    "ladies haircut Burnley",
  ],
  openGraph: {
    title: "BRAD.THE.BARBER Burnley | Premium Barber, Haircuts & Beard Trims",
    description:
      "Book premium haircuts, beard trims, hot towel shaves and grooming appointments at BRAD.THE.BARBER in Burnley.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website" as const,
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Premium Barbering in Burnley`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "BRAD.THE.BARBER Burnley | Premium Barber",
    description:
      "Premium haircuts, beard trims and hot towel shaves in Burnley. Book online today.",
    images: [`${SITE_URL}/assets/images/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export { SITE_PHONE_DISPLAY };
