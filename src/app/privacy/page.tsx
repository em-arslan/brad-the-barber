import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Privacy Policy | BRAD.THE.BARBER",
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 min-h-screen bg-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl text-white mb-8 tracking-wide">Privacy Policy</h1>
        <div className="prose prose-invert text-muted space-y-4 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-GB")}</p>
          <p>
            BRAD.THE.BARBER (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy.
            This policy explains how we collect, use and safeguard your personal information when you use our website and booking services.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">Information We Collect</h2>
          <p>
            When you book an appointment or contact us, we may collect your name, email address, phone number,
            and appointment details. This information is used solely to manage your bookings and communicate with you about your appointments.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">How We Use Your Data</h2>
          <p>
            Your data is used to process appointments, send confirmations, and improve our services.
            We do not sell or share your personal information with third parties for marketing purposes.
          </p>
          <h2 className="font-serif text-xl text-white pt-4">Contact</h2>
          <p>
            For privacy enquiries, please contact us via our contact page or call 07874 071809.
          </p>
        </div>
        <Link href="/" className="inline-block mt-10">
          <Button variant="outline" size="md">Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
