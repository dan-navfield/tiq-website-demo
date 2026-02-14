import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ReadMoreItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Link
        href={blok.url || "#"}
        className="group flex items-center justify-between p-5 bg-white border border-neutral-dark hover:border-navy hover:shadow-md transition-all duration-200 h-full"
      >
        <span className="text-sm font-semibold text-black group-hover:text-navy transition-colors leading-snug pr-2">
          {blok.title}
        </span>
        <ChevronRight
          size={18}
          className="text-gray-400 group-hover:text-navy flex-shrink-0 transition-colors"
        />
      </Link>
    </div>
  );
}
