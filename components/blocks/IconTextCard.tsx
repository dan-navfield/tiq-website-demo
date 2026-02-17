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
        "rounded overflow-hidden flex flex-col items-start",
        isNavy && "bg-navy text-white",
        isAqua && "bg-tiq-aqua text-navy",
        !isNavy && !isAqua && "bg-white border border-gray-200"
      )}
      style={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 8px 0px, rgba(0,0,0,0.05) 0px 1px 4px 0px",
      }}
    >
      {/* Aqua gradient top accent bar */}
      <div
        className="w-full h-1 flex-shrink-0"
        style={{
          background: "linear-gradient(90deg, #00E6E5 0%, #00B8D4 100%)",
        }}
      />
      <div className="p-8 flex flex-col items-start space-y-4 w-full">
      {blok.icon?.filename && (
        <div className="w-12 h-12 flex-shrink-0">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={48}
            height={48}
            className={cn(
              "object-contain",
              isNavy && "brightness-0 invert"
            )}
          />
        </div>
      )}

      {blok.heading && (
        <h3 className={cn(
          "text-[22px] font-semibold font-heading leading-[26.4px]",
          isNavy ? "text-tiq-aqua" : "text-navy"
        )}>
          {blok.heading}
        </h3>
      )}

      {blok.description && (
        <p className={cn(
          "text-base leading-6",
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
            isNavy && "tiq-btn-aqua",
            isAqua && "tiq-btn-outline-navy",
            !isNavy && !isAqua && "tiq-btn-outline-navy"
          )}
        >
          {blok.link_text}
          {isExternal && <ExternalLink size={14} />}
        </a>
      )}
      </div>
    </div>
  );
}
