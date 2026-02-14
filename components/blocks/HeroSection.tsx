import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeroSection({ blok }: { blok: any }) {
  const isDark =
    blok.background_theme === "dark" || blok.background_theme === "navy";

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn(
        "relative overflow-hidden",
        isDark ? "bg-navy text-white" : "bg-neutral text-black"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Hero Image/Logo */}
          {blok.image?.filename && (
            <div className="flex justify-center mb-8">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={600}
                height={200}
                className="max-w-full h-auto max-h-32 object-contain"
              />
            </div>
          )}

          {/* Headline */}
          {blok.headline && (
            <h1
              className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-light leading-snug",
                isDark ? "text-white" : "text-black"
              )}
            >
              {blok.headline}
            </h1>
          )}

          {/* CTA Button */}
          {blok.cta_text && blok.cta_url && (
            <div>
              <Link
                href={blok.cta_url}
                className={cn(
                  "inline-block px-8 py-3 text-sm font-semibold uppercase tracking-wider border-2 transition-colors",
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-navy"
                    : "border-navy text-navy hover:bg-navy hover:text-white"
                )}
              >
                {blok.cta_text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
