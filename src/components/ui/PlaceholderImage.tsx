"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
}

export default function PlaceholderImage({
  src,
  alt,
  fill = false,
  className,
  priority = false,
  loading,
  sizes,
}: PlaceholderImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          "placeholder-image flex items-center justify-center",
          fill && "absolute inset-0",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="text-center p-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-gold/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gold/50 text-xs tracking-widest uppercase">Add Image</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : 800}
      height={fill ? undefined : 600}
      className={cn("object-cover", className)}
      priority={priority}
      loading={priority ? undefined : loading ?? "lazy"}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
}
