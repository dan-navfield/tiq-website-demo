import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function NewsItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="h-full">
      <Link
        href={blok.url || "#"}
        className="group relative block bg-white rounded overflow-hidden hover:shadow-lg transition-all duration-200 h-full flex flex-col"
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

        <div className="p-6 flex-1">
          <h3 className="text-base font-semibold font-heading text-navy group-hover:text-navy-light leading-snug transition-colors line-clamp-3">
            {blok.title}
          </h3>
        </div>

        {/* Aqua hover accent — bottom-left triangle */}
        <div
          className="absolute bottom-0 left-0 w-[140px] h-[70px] bg-tiq-aqua opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}
        />
      </Link>
    </div>
  );
}
