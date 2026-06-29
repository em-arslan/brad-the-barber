import type { Metadata } from "next";
import LoginPageClient from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Member Login | BRAD.THE.BARBER",
  description: "Sign in to your BRAD.THE.BARBER member account to view and manage your appointments.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginPageClient />;
}
