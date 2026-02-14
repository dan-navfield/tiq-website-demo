import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function CtaCard({ blok }: { blok: any }) {
  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-navy p-10 md:p-14 flex flex-col items-start space-y-5"
    >
      {blok.icon?.filename && (
        <div className="w-16 h-16 flex items-center justify-center">
          <Image
            src={blok.icon.filename}
            alt={blok.icon.alt || ""}
            width={64}
            height={64}
            className="object-contain brightness-0 invert"
          />
        </div>
      )}

      {blok.heading && (
        <h2 className="text-xl md:text-2xl font-bold text-tiq-aqua leading-tight">
          {blok.heading}
        </h2>
      )}

      {blok.description && (
        <p className="text-white/80 text-sm leading-relaxed">
          {blok.description}
        </p>
      )}

      {blok.button_text && blok.button_url && (
        <Link href={blok.button_url} className="tiq-btn tiq-btn-aqua mt-2">
          {blok.button_text}
        </Link>
      )}
    </div>
  );
}
