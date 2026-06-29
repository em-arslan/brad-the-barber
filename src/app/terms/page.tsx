import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Terms & Conditions | BRAD.THE.BARBER",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl text-white mb-8 tracking-wide">Terms &amp; Conditions</h1>
        <div className="text-muted space-y-4 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          <p>
            By using the BRAD.THE.BARBER website and booking system, you agree to these terms and conditions.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">Appointments</h2>
          <p>
            Appointments are subject to availability. We recommend arriving on time for your scheduled slot.
            If you need to cancel or reschedule, please do so as early as possible via our online booking system or by calling us.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">Pricing</h2>
          <p>
            All prices displayed on our website are in GBP and are subject to change. The price confirmed at the time of booking applies to your appointment.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">Liability</h2>
          <p>
            BRAD.THE.BARBER provides professional barbering services. We are not liable for any indirect or consequential damages arising from the use of our services or website.
          </p>
        </div>
        <Link href="/" className="inline-block mt-10">
          <Button variant="outline" size="md">Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
