import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ReadMoreItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Link
        href={blok.url || "#"}
        className="group flex items-center justify-between p-6 bg-white border border-gray-200 hover:border-navy hover:shadow-md transition-all"
      >
        <span className="text-base font-semibold text-black group-hover:text-navy transition-colors">
          {blok.title}
        </span>
        <ChevronRight
          size={20}
          className="text-gray-400 group-hover:text-navy flex-shrink-0 transition-colors"
        />
      </Link>
    </div>
  );
}
