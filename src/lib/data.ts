import type { Barber, OpeningHours, Review, Service } from "@/types";

export const SITE_NAME = "BRAD.THE.BARBER";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bradthebarber.co.uk";
export const SITE_PHONE = "07874071809";
export const SITE_PHONE_DISPLAY = "07874 071809";
export const SITE_EMAIL = "hello@bradthebarber.co.uk";

export const OUTLET_IMAGE = {
  src: "/assets/images/outlet.webp",
  alt: "BRAD.THE.BARBER shop front on Hargreaves Street, Burnley",
};

export const ADDRESS = {
  name: "BRAD.THE.BARBER",
  street: "16 Hargreaves St",
  city: "Burnley",
  county: "Lancashire",
  postcode: "BB11 1DZ",
  full: "16 Hargreaves St, Burnley, Lancashire, BB11 1DZ",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/brad.the.barber",
  instagram: "https://www.instagram.com/brad_the_barber1",
  tiktok: "https://www.tiktok.com/@brad_the_barber1",
  whatsapp: `https://wa.me/44${SITE_PHONE.replace(/^0/, "")}`,
};

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_ITEMS = [
  "5 Star Rated",
  "Burnley Based",
  "Ladies, Gents & Children",
  "Easy Online Booking",
  "Premium Grooming Experience",
];

export const SERVICES: Service[] = [
  {
    id: "gents-haircut",
    name: "Gents Haircut",
    duration: 30,
    price: 15,
    category: "gents",
    description:
      "Precision scissor and clipper work tailored to your style — sharp, clean and confidently finished.",
  },
  {
    id: "boys-haircut",
    name: "Boys Haircut (10 and Under)",
    duration: 30,
    price: 10,
    category: "children",
    description:
      "Gentle, patient cuts for young gents in a relaxed, welcoming environment they'll enjoy.",
  },
  {
    id: "ladies-haircut",
    name: "Ladies Haircut",
    duration: 30,
    price: 20,
    category: "ladies",
    description:
      "Expert shaping and styling with meticulous attention to detail for a polished, premium finish.",
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    duration: 30,
    price: 20,
    category: "grooming",
    description:
      "Classic wet shave ritual with hot towels, premium products and a smooth, refined result.",
  },
  {
    id: "beard-trim",
    name: "Beard Trim",
    duration: 15,
    price: 10,
    category: "grooming",
    description:
      "Expert beard shaping and line work to keep your facial hair sharp, balanced and well-defined.",
  },
  {
    id: "haircut-beard",
    name: "Haircut & Beard Trim",
    duration: 40,
    price: 25,
    category: "gents",
    description:
      "The complete grooming package — a fresh cut and beard trim for a sharp, head-to-chin finish.",
  },
  {
    id: "waxing-brow",
    name: "Waxing (Brow)",
    duration: 15,
    price: 5,
    category: "waxing",
    description:
      "Quick, precise brow waxing for a clean, defined look with minimal fuss.",
  },
  {
    id: "ladies-styling",
    name: "Ladies Hairstyling",
    duration: 30,
    price: 15,
    category: "ladies",
    description:
      "Professional styling and finishing for occasions, events or simply looking your absolute best.",
  },
];

export const BARBERS: Barber[] = [
  { id: "any", name: "No Preference", role: "Any Available Barber" },
  { id: "brad", name: "Brad", role: "Master Barber" },
  { id: "bailey", name: "Bailey", role: "Senior Barber" },
];

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Jack T",
    date: "26 February",
    rating: 5,
    text: "Bailey was attentive and detailed with the cut and made sure I was happy throughout, will 100% be coming back.",
  },
  {
    id: "2",
    name: "Elaine J",
    date: "11 March",
    rating: 5,
    text: "Always 5 stars at Brad.the.Barber. Always accommodates besides perfect hair. Thanks Brad.",
  },
  {
    id: "3",
    name: "Jay R",
    date: "09 March",
    rating: 5,
    text: "Looked and felt great after my appointment.",
  },
  {
    id: "4",
    name: "Reece J",
    date: "06 March",
    rating: 5,
    text: "Brilliant service.",
  },
  {
    id: "5",
    name: "Jason C",
    date: "27 February",
    rating: 5,
    text: "Great service! Would highly recommend.",
  },
  {
    id: "6",
    name: "Calum J",
    date: "19 February",
    rating: 5,
    text: "First haircut with Bailey was spot on.",
  },
];

export const OPENING_HOURS: OpeningHours[] = [
  { day: "Monday", hours: "Closed", closed: true },
  { day: "Tuesday", hours: "10:00am – 6:00pm" },
  { day: "Wednesday", hours: "10:00am – 6:00pm" },
  { day: "Thursday", hours: "10:00am – 8:00pm" },
  { day: "Friday", hours: "10:00am – 6:00pm" },
  { day: "Saturday", hours: "8:30am – 2:00pm" },
  { day: "Sunday", hours: "10:00am – 4:00pm" },
];

/** Hero slider images — optimized WebP in /public/assets/images/ */
export const HERO_IMAGES = [
  {
    src: "/assets/images/hero-1.webp",
    alt: "Premium ladies hairstyling at BRAD.THE.BARBER Burnley",
  },
  {
    src: "/assets/images/hero-2.webp",
    alt: "Professional barber performing a precision fade at BRAD.THE.BARBER",
  },
  {
    src: "/assets/images/hero-3.webp",
    alt: "Luxury barbering and styling for ladies at BRAD.THE.BARBER Burnley",
  },
  {
    src: "/assets/images/hero-4.webp",
    alt: "Expert clipper work and skin fade at BRAD.THE.BARBER",
  },
  {
    src: "/assets/images/hero-5.webp",
    alt: "Premium gents haircut and grooming at BRAD.THE.BARBER Burnley",
  },
  {
    src: "/assets/images/hero-6.webp",
    alt: "Sharp skin fade and luxury barber chair experience at BRAD.THE.BARBER",
  },
  {
    src: "/assets/images/hero-7.webp",
    alt: "Professional ladies blow dry and premium salon finish at BRAD.THE.BARBER",
  },
];

export const GALLERY_IMAGES = [
  { src: "/assets/images/gallery-1.webp", alt: "Sharp skin fade haircut Burnley" },
  { src: "/assets/images/gallery-2.webp", alt: "Premium beard trim and line up" },
  { src: "/assets/images/gallery-3.webp", alt: "Classic gents haircut styling" },
  { src: "/assets/images/gallery-4.webp", alt: "Luxury barber shop experience" },
  { src: "/assets/images/gallery-5.webp", alt: "Clean taper fade haircut" },
  { src: "/assets/images/gallery-6.webp", alt: "Professional ladies haircut Burnley" },
];

export const FAQ_ITEMS = [
  {
    question: "How do I book an appointment at BRAD.THE.BARBER?",
    answer:
      "You can book online through our website using the booking section, or call us directly on 07874 071809. Select your service, preferred barber, date and time to confirm your appointment.",
  },
  {
    question: "Do you cut hair for ladies and children?",
    answer:
      "Yes. We welcome ladies, gents and children of all ages. We offer dedicated services for boys aged 10 and under, ladies haircuts and ladies hairstyling.",
  },
  {
    question: "Where is BRAD.THE.BARBER located?",
    answer:
      "We are located at 16 Hargreaves St, Burnley, Lancashire, BB11 1DZ. Easy to find with convenient parking nearby.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are closed on Mondays. Tuesday to Friday 10:00am–6:00pm (Thursday until 8:00pm), Saturday 8:30am–2:00pm, and Sunday 10:00am–4:00pm.",
  },
  {
    question: "Can I cancel or find my appointment online?",
    answer:
      "Yes. Use the Find My Appointment feature with your email or booking reference to view or cancel your appointment at any time.",
  },
];

export function formatPrice(price: number): string {
  return `£${price}`;
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function getBarberById(id: string): Barber | undefined {
  return BARBERS.find((b) => b.id === id);
}

export function getCategoryLabel(category: Service["category"]): string {
  const labels: Record<Service["category"], string> = {
    gents: "Gents",
    ladies: "Ladies",
    children: "Children",
    grooming: "Grooming",
    waxing: "Waxing",
  };
  return labels[category];
}
