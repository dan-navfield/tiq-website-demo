import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function CtaCard({ blok }: { blok: any }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="border-2 border-navy p-8 md:p-12 flex flex-col items-center text-center space-y-6 hover:shadow-lg transition-shadow"
    >
      {/* Icon */}
      {blok.icon?.filename && (
        <div className="w-24 h-24 flex items-center justify-center">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={96}
            height={96}
            className="object-contain"
          />
        </div>
      )}

      {/* Heading */}
      {blok.heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {blok.heading}
        </h2>
      )}

      {/* Description */}
      {blok.description && (
        <p className="text-gray-600 text-base leading-relaxed max-w-sm">
          {blok.description}
        </p>
      )}

      {/* Button */}
      {blok.button_text && blok.button_url && (
        <Link
          href={blok.button_url}
          className="inline-block px-8 py-3 border-2 border-navy text-navy text-sm font-semibold uppercase tracking-wider hover:bg-navy hover:text-white transition-colors"
        >
          {blok.button_text}
        </Link>
      )}
    </div>
  );
}
