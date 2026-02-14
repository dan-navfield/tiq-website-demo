import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function NewsItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Link
        href={blok.url || "#"}
        className="group block bg-white rounded overflow-hidden hover:shadow-lg transition-shadow duration-200"
        style={{
          boxShadow: "rgba(0,0,0,0.1) 0px 4px 8px 0px, rgba(0,0,0,0.05) 0px 1px 4px 0px",
        }}
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

        <div className="p-6">
          <h3 className="text-base font-semibold font-heading text-navy group-hover:text-navy-light leading-snug transition-colors line-clamp-3">
            {blok.title}
          </h3>
        </div>
      </Link>
    </div>
  );
}
