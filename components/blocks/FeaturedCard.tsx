import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FeaturedCard({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={blok.cta_url || "#"}
          className="group grid md:grid-cols-2 gap-8 items-center border-2 border-navy p-0 overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Thumbnail */}
          {blok.image?.filename && (
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden bg-gray-100">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={800}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-black group-hover:text-navy transition-colors leading-snug">
              {blok.headline}
            </h2>

            {blok.cta_text && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-navy">
                {blok.cta_text}
                <ChevronRight size={16} />
              </span>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}
