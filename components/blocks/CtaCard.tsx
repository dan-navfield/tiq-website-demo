import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CtaCard({ blok }: { blok: any }) {
  // Support per-card theme: "navy" or default "aqua"
  const isNavy = blok.theme === "navy" || blok.background === "navy";

  return (
    <div
      {...storyblokEditable(blok)}
      className={cn(
        "rounded p-8 flex flex-col items-start h-full min-h-[290px]",
        isNavy ? "bg-navy" : "bg-tiq-aqua"
      )}
      style={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 8px 0px, rgba(0,0,0,0.05) 0px 1px 4px 0px",
      }}
    >
      {blok.icon?.filename && (
        <div className="w-12 h-12 mb-4">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={48}
            height={48}
            className={cn("object-contain", isNavy && "brightness-0 invert")}
          />
        </div>
      )}

      {blok.heading && (
        <h2
          className={cn(
            "text-[22px] font-semibold font-heading leading-[26.4px] mb-4",
            isNavy ? "text-white" : "text-navy"
          )}
        >
          {blok.heading}
        </h2>
      )}

      {blok.description && (
        <p
          className={cn(
            "text-base leading-6 mb-4",
            isNavy ? "text-white/80" : "text-gray-800"
          )}
        >
          {blok.description}
        </p>
      )}

      {blok.button_text && blok.button_url && (
        <Link
          href={blok.button_url}
          className={cn(
            "tiq-btn mt-auto",
            isNavy ? "tiq-btn-aqua" : "tiq-btn-outline-navy"
          )}
        >
          {blok.button_text}
        </Link>
      )}
    </div>
  );
}
