import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TextSection({ blok }: { blok: any }) {
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          blok.centered ? "max-w-3xl mx-auto text-center" : "max-w-4xl"
        )}>
          {blok.heading && (
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              {blok.heading}
            </h2>
          )}

          {blok.body && (
            <div className="text-gray-600 text-base leading-relaxed space-y-4 prose prose-gray max-w-none">
              {blok.body.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {blok.cta_text && blok.cta_url && (
            <div className={cn("mt-8", blok.centered && "flex justify-center")}>
              <Link href={blok.cta_url} className="tiq-btn">
                {blok.cta_text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
