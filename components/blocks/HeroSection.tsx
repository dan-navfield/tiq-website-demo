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
      {/* Background image overlay */}
      {blok.image?.filename && isDark && (
        <div className="absolute inset-0">
          <Image
            src={blok.image.filename}
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl space-y-8">
          {/* Hero Logo */}
          {blok.image?.filename && !isDark && (
            <div>
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={500}
                height={160}
                className="max-w-[400px] w-full h-auto object-contain"
              />
            </div>
          )}

          {/* For dark theme, show the logo as inline content */}
          {blok.image?.filename && isDark && (
            <div>
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={400}
                height={130}
                className="max-w-[350px] w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Headline */}
          {blok.headline && (
            <p
              className={cn(
                "text-base sm:text-lg md:text-xl font-medium leading-relaxed",
                isDark ? "text-white" : "text-black"
              )}
            >
              {blok.headline}
            </p>
          )}

          {/* CTA Button */}
          {blok.cta_text && blok.cta_url && (
            <div>
              <Link
                href={blok.cta_url}
                className={cn(
                  "tiq-btn",
                  isDark && "tiq-btn-aqua"
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
