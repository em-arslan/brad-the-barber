"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 mb-4",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">
          BRAD.THE.BARBER
        </span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
      </div>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-wide mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
