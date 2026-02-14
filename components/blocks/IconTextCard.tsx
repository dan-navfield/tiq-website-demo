import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function IconTextCard({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
          {/* Icon */}
          {blok.icon?.filename && (
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={blok.icon.filename}
                alt={blok.icon.alt || ""}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 space-y-2">
            {blok.heading && (
              <h2 className="text-2xl font-bold text-black">{blok.heading}</h2>
            )}
            {blok.description && (
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {blok.description}
              </p>
            )}
          </div>

          {/* Link */}
          {blok.link_text && blok.link_url && (
            <a
              href={blok.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy text-sm font-semibold uppercase tracking-wider hover:bg-navy hover:text-white transition-colors flex-shrink-0"
            >
              {blok.link_text}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
