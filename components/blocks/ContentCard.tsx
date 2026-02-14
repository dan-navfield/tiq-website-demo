import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ContentCard({ blok }: { blok: any }) {
  const Wrapper = blok.url ? Link : "div";
  const wrapperProps = blok.url ? { href: blok.url } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      {...storyblokEditable(blok)}
      className="group block border border-neutral-dark bg-white hover:border-navy hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {blok.image?.filename && (
        <div className="aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={blok.image.filename}
            alt={blok.image.alt || blok.heading || ""}
            width={600}
            height={375}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 space-y-3">
        {blok.label && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {blok.label}
          </p>
        )}

        {blok.heading && (
          <h3 className="text-lg font-bold text-black group-hover:text-navy transition-colors leading-snug">
            {blok.heading}
          </h3>
        )}

        {blok.description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {blok.description}
          </p>
        )}

        {blok.url && (
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy pt-1">
            Learn more
            <ChevronRight size={14} />
          </span>
        )}
      </div>
    </Wrapper>
  );
}
