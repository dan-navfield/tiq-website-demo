import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function CtaCard({ blok }: { blok: any }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="border-2 border-navy p-10 md:p-14 flex flex-col items-center text-center space-y-6 hover:shadow-lg transition-shadow duration-200"
    >
      {blok.icon?.filename && (
        <div className="w-20 h-20 flex items-center justify-center">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      )}

      {blok.heading && (
        <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
          {blok.heading}
        </h2>
      )}

      {blok.description && (
        <p className="text-gray-600 text-base leading-relaxed max-w-xs">
          {blok.description}
        </p>
      )}

      {blok.button_text && blok.button_url && (
        <Link href={blok.button_url} className="tiq-btn mt-2">
          {blok.button_text}
        </Link>
      )}
    </div>
  );
}
