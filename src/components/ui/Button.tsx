"use client";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  shine?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-white text-charcoal hover:bg-champagne font-semibold shadow-lg shadow-black/20",
  secondary:
    "gold-gradient-bg text-charcoal font-semibold hover:opacity-90 shadow-lg shadow-gold/10",
  outline:
    "border border-gold/50 text-gold hover:bg-gold/10 font-medium",
  ghost: "text-muted hover:text-gold font-medium",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  shine = true,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer inline-flex items-center justify-center rounded-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        shine && variant !== "ghost" && "btn-shine",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
