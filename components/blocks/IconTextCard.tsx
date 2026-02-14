import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function IconTextCard({ blok }: { blok: any }) {
  const isExternal = blok.link_url?.startsWith("http");

  return (
    <section {...storyblokEditable(blok)} className="bg-white border-b border-neutral-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          {blok.icon?.filename && (
            <div className="w-14 h-14 flex-shrink-0">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || ""}
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
          )}

          <div className="flex-1 space-y-1.5">
            {blok.heading && (
              <h2 className="text-xl md:text-2xl font-bold text-black">
                {blok.heading}
              </h2>
            )}
            {blok.description && (
              <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl">
                {blok.description}
              </p>
            )}
          </div>

          {blok.link_text && blok.link_url && (
            <a
              href={blok.link_url}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="tiq-btn flex-shrink-0 inline-flex items-center gap-2"
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
