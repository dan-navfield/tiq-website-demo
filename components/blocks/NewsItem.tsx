import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NewsItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="group">
      <Link href={blok.url || "#"} className="block space-y-4">
        {/* Thumbnail */}
        {blok.image?.filename && (
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || blok.title || ""}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Label */}
        {blok.label && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {blok.label}
          </p>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-black group-hover:text-navy leading-snug transition-colors">
          {blok.title}
        </h3>

        {/* Learn More */}
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-navy">
          Learn more
          <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
}
