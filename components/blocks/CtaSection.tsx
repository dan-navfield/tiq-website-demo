import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function CtaSection({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="bg-neutral"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {blok.heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              {blok.heading}
            </h2>
          )}

          {blok.description && (
            <p className="text-gray-600 text-lg leading-relaxed">
              {blok.description}
            </p>
          )}

          {blok.button_text && blok.button_url && (
            <div className="pt-2">
              <Link
                href={blok.button_url}
                className="inline-block px-8 py-3 border-2 border-navy text-navy text-sm font-semibold uppercase tracking-wider hover:bg-navy hover:text-white transition-colors"
              >
                {blok.button_text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
