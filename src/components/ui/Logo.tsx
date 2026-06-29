import Link from "next/link";
import { SITE_NAME } from "@/lib/data";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-serif tracking-[0.15em] gold-gradient-text uppercase inline-block",
        className
      )}
    >
      {SITE_NAME}
    </Link>
  );
}
