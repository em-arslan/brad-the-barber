import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | BRAD.THE.BARBER Burnley",
  description:
    "View our full menu of premium barbering services including haircuts, beard trims, hot towel shaves and grooming. Prices from £5. Book online at BRAD.THE.BARBER Burnley.",
  alternates: {
    canonical: "https://bradthebarber.co.uk/services",
  },
  openGraph: {
    title: "Services | BRAD.THE.BARBER Burnley",
    description: "Premium barbering services in Burnley. Haircuts, beard trims, hot towel shaves and more.",
    url: "https://bradthebarber.co.uk/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
