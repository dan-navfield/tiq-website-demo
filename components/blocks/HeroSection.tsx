import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeroSection({ blok }: { blok: any }) {
  const isDark =
    blok.background_theme === "dark" || blok.background_theme === "navy";
  const bgImage = blok.background_image?.filename;

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn(
        "relative overflow-hidden min-h-[566px] flex items-center",
        isDark ? "bg-navy text-white" : "bg-neutral text-black"
      )}
    >
      {/* Background image with overlay */}
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
      )}

      <div className="relative max-w-[1232px] mx-auto px-4 w-full pt-[120px] pb-16">
        <div className="space-y-8">
          {/* Hero Logo/Image */}
          {blok.image?.filename && (
            <div>
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={420}
                height={171}
                className="w-[420px] h-auto object-contain"
                style={{ marginTop: "-30px" }}
                priority
              />
            </div>
          )}

          {/* Headline */}
          {blok.headline && (
            <p
              className={cn(
                "font-heading text-[22px] font-semibold leading-[26.4px] max-w-[512px] mb-8",
                isDark || bgImage ? "text-white" : "text-navy"
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
                  (isDark || bgImage) && "tiq-btn-fluro"
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
