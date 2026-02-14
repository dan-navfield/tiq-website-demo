import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PageHero({ blok }: { blok: any }) {
  const isDark = blok.background === "dark";
  const hasImage = !!blok.image?.filename;

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn(
        "relative overflow-hidden",
        isDark ? "bg-navy text-white" : "bg-neutral text-black"
      )}
    >
      {hasImage && (
        <div className="absolute inset-0">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || ""}
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {blok.eyebrow && (
            <p className={cn(
              "text-sm font-semibold uppercase tracking-wider mb-4",
              isDark || hasImage ? "text-white/70" : "text-gray-500"
            )}>
              {blok.eyebrow}
            </p>
          )}

          {blok.heading && (
            <h1 className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
              isDark || hasImage ? "text-white" : "text-black"
            )}>
              {blok.heading}
            </h1>
          )}

          {blok.subheading && (
            <p className={cn(
              "text-lg md:text-xl leading-relaxed mt-6 max-w-2xl",
              isDark || hasImage ? "text-white/80" : "text-gray-600"
            )}>
              {blok.subheading}
            </p>
          )}

          {(blok.cta_text && blok.cta_url) && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={blok.cta_url}
                className={cn("tiq-btn", (isDark || hasImage) && "tiq-btn-light")}
              >
                {blok.cta_text}
              </Link>
              {blok.cta_secondary_text && blok.cta_secondary_url && (
                <Link
                  href={blok.cta_secondary_url}
                  className={cn("tiq-btn", (isDark || hasImage) && "tiq-btn-light")}
                >
                  {blok.cta_secondary_text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
