import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | BRAD.THE.BARBER Burnley",
  description:
    "Contact BRAD.THE.BARBER in Burnley. Call, email or send a message. Located at 16 Hargreaves St, Burnley BB11 1DZ.",
  alternates: {
    canonical: "https://bradthebarber.co.uk/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
