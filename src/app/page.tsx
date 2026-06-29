"use client";

import { useState, useCallback } from "react";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import About from "@/components/sections/About";
import ServicesPreview from "@/components/sections/ServicesPreview";
import BookingFlow from "@/components/booking/BookingFlow";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const [preselectedService, setPreselectedService] = useState<string | undefined>();

  const handleBookService = useCallback((serviceId: string) => {
    setPreselectedService(serviceId);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <ServicesPreview onBookService={handleBookService} />
      <BookingFlow preselectedServiceId={preselectedService} />
      <Gallery />
      <Reviews />
      <Location />
      <Contact />
    </>
  );
}
