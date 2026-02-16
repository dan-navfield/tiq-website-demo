import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LinkList({ blok }: { blok: any }) {
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";
  const isTagStyle = blok.layout === "tags";

  return (
    <section {...storyblokEditable(blok)} className={cn("py-10 md:py-14", bgClass)}>
      <div className="max-w-[1232px] mx-auto px-4">
        {blok.heading && (
          <h2 className="text-[22px] md:text-[26px] font-bold font-heading text-black mb-6">
            {blok.heading}
          </h2>
        )}

        {isTagStyle ? (
          <div className="flex flex-wrap gap-3">
            {blok.links?.map((link: any) => (
              <Link
                key={link._uid}
                href={link.url || "#"}
                className="text-sm text-[#333338] underline hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}
