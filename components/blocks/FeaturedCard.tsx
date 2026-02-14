import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FeaturedCard({ blok }: { blok: any }) {
  const isExternal = blok.cta_url?.startsWith("http");
  const LinkTag = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: blok.cta_url || "#", target: "_blank", rel: "noopener noreferrer" }
    : { href: blok.cta_url || "#" };

  return (
    <section {...storyblokEditable(blok)} className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LinkTag
          {...(linkProps as any)}
          className="group grid md:grid-cols-2 border-2 border-navy overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {blok.image?.filename && (
            <div className="aspect-video md:aspect-auto md:min-h-[280px] overflow-hidden bg-gray-100">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={800}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
            <h2 className="text-2xl md:text-[28px] font-bold text-black group-hover:text-navy transition-colors leading-snug">
              {blok.headline}
            </h2>

            {blok.cta_text && (
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy">
                {blok.cta_text}
                <ChevronRight size={14} />
              </span>
            )}
          </div>
        </LinkTag>
      </div>
    </section>
  );
}
