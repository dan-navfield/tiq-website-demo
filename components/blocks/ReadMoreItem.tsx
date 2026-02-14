import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function ReadMoreItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Link
        href={blok.url || "#"}
        className="group block bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        {blok.image?.filename && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-100">
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || blok.title || ""}
              width={600}
              height={375}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <span className="text-base font-semibold text-black group-hover:text-navy transition-colors leading-snug">
            {blok.title}
          </span>
        </div>
      </Link>
    </div>
  );
}
