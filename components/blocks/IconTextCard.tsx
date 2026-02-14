import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function IconTextCard({ blok }: { blok: any }) {
  const isExternal = blok.link_url?.startsWith("http");
  const isNavy = blok.background === "navy";
  const isAqua = blok.background === "aqua";
  const hasCardBg = isNavy || isAqua;

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn(
        hasCardBg ? "p-8 md:p-10" : "bg-white border-b border-neutral-dark py-10 md:py-14",
        isNavy && "bg-navy text-white",
        isAqua && "bg-tiq-aqua text-navy"
      )}
    >
      <div className={cn(!hasCardBg && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8")}>
        <div className={cn(
          hasCardBg
            ? "flex flex-col items-start space-y-4"
            : "flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
        )}>
          {blok.icon?.filename && (
            <div className="w-14 h-14 flex-shrink-0">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || ""}
                width={56}
                height={56}
                className={cn("object-contain", hasCardBg && "brightness-0 invert")}
              />
            </div>
          )}

          <div className="flex-1 space-y-2">
            {blok.heading && (
              <h2 className={cn(
                "text-xl md:text-2xl font-bold",
                isNavy ? "text-tiq-aqua" : isAqua ? "text-navy" : "text-black"
              )}>
                {blok.heading}
              </h2>
            )}
            {blok.description && (
              <p className={cn(
                "text-sm leading-relaxed",
                isNavy ? "text-white/80" : isAqua ? "text-navy/80" : "text-gray-600"
              )}>
                {blok.description}
              </p>
            )}
          </div>

          {blok.link_text && blok.link_url && (
            <a
              href={blok.link_url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "tiq-btn flex-shrink-0 inline-flex items-center gap-2",
                isNavy && "tiq-btn-light",
                isAqua && "border-navy text-navy hover:bg-navy hover:text-white"
              )}
            >
              {blok.link_text}
              {isExternal && <ExternalLink size={14} />}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
