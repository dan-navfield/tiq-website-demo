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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          {/* Hero Image/Logo */}
          {blok.image?.filename && (
            <div className="flex justify-center">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={500}
                height={160}
                className="max-w-[400px] w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Headline */}
          {blok.headline && (
            <h1
              className={cn(
                "text-xl sm:text-2xl md:text-[28px] font-light leading-relaxed",
                isDark ? "text-white/90" : "text-black"
              )}
            >
              {blok.headline}
            </h1>
          )}

          {/* CTA Button */}
          {blok.cta_text && blok.cta_url && (
            <div className="pt-2">
              <Link
                href={blok.cta_url}
                className={cn(
                  "tiq-btn",
                  isDark && "tiq-btn-light"
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
