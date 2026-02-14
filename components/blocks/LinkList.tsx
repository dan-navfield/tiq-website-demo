import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LinkList({ blok }: { blok: any }) {
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blok.heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            {blok.heading}
          </h2>
        )}

        <div className="max-w-2xl space-y-0 border-t border-neutral-dark">
          {blok.links?.map((link: any) => (
            <Link
              key={link._uid}
              href={link.url || "#"}
              className="group flex items-center justify-between py-4 border-b border-neutral-dark hover:bg-gray-50 px-2 -mx-2 transition-colors"
            >
              <span className="text-base font-medium text-black group-hover:text-navy transition-colors">
                {link.label}
              </span>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-navy flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
