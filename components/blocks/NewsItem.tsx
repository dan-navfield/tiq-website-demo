import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NewsItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="group">
      <Link href={blok.url || "#"} className="block space-y-3">
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

        {blok.label && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {blok.label}
          </p>
        )}

        <h3 className="text-[15px] font-semibold text-black group-hover:text-navy leading-snug transition-colors line-clamp-3">
          {blok.title}
        </h3>

        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy">
          Learn more
          <ChevronRight size={14} />
        </span>
      </Link>
    </div>
  );
}
