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
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
      )}

      <div className="relative max-w-[1232px] mx-auto px-4 flex flex-col min-h-[515px]">
        {/* Breadcrumb - pinned to top */}
        {blok.breadcrumb_label && (
          <nav className="pt-[148px] text-sm">
            <Link href="/" className="text-white/70 hover:text-white underline">Home</Link>
            <span className="text-white/50 mx-2">/</span>
            <span className="text-white/90">{blok.breadcrumb_label}</span>
          </nav>
        )}

        {/* Spacer pushes heading + links to lower portion */}
        <div className="flex-1" />

        {blok.heading && (
          <h1 className={cn(
            "text-3xl md:text-[40px] font-bold font-heading leading-tight mb-10",
            isDark || hasImage ? "text-white" : "text-black"
          )}>
            {blok.heading}
          </h1>
        )}

        {/* Quick nav links - at bottom */}
        {blok.quick_links && (
          <div className="flex flex-wrap gap-2 pb-8">
            {blok.quick_links.split("\n").map((line: string, i: number) => {
              const parts = line.split("|");
              const label = parts[0]?.trim();
              const url = parts[1]?.trim() || "#";
              if (!label) return null;
              return (
                <Link
                  key={i}
                  href={url}
                  className="text-sm text-white border border-white/40 rounded-sm px-3 py-1.5 hover:bg-white/10 transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
