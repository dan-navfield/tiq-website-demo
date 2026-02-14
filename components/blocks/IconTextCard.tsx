import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IconTextCard({ blok }: { blok: any }) {
  const isExternal = blok.link_url?.startsWith("http");
  const isNavy = blok.background === "navy";
  const isAqua = blok.background === "aqua";

  return (
    <div
      {...storyblokEditable(blok)}
      className={cn(
        "p-8 md:p-10 flex flex-col items-start space-y-4",
        isNavy && "bg-navy text-white",
        isAqua && "bg-tiq-aqua text-navy",
        !isNavy && !isAqua && "bg-white border border-gray-200"
      )}
    >
      {blok.icon?.filename && (
        <div className="w-12 h-12 flex-shrink-0">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={48}
            height={48}
            className={cn(
              "object-contain",
              (isNavy || isAqua) && "brightness-0 invert"
            )}
          />
        </div>
      )}

      {blok.heading && (
        <h3 className={cn(
          "text-lg md:text-xl font-bold",
          isNavy ? "text-tiq-aqua" : "text-navy"
        )}>
          {blok.heading}
        </h3>
      )}

      {blok.description && (
        <p className={cn(
          "text-sm leading-relaxed",
          isNavy ? "text-white/80" : isAqua ? "text-navy/80" : "text-gray-600"
        )}>
          {blok.description}
        </p>
      )}

      {blok.link_text && blok.link_url && (
        <a
          href={blok.link_url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "tiq-btn inline-flex items-center gap-2 mt-auto",
            isNavy && "tiq-btn-light",
            isAqua && "border-navy text-navy hover:bg-navy hover:text-white"
          )}
        >
          {blok.link_text}
          {isExternal && <ExternalLink size={14} />}
        </a>
      )}
    </div>
  );
}
