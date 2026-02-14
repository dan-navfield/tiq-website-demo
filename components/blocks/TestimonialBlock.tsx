import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function TestimonialBlock({ blok }: { blok: any }) {
  const bgClass = blok.background === "navy" ? "bg-navy text-white" : "bg-neutral text-black";

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blok.heading && (
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-10 text-center",
            blok.background === "navy" ? "text-white" : "text-black"
          )}>
            {blok.heading}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blok.testimonials?.map((t: any) => (
            <div
              key={t._uid}
              className={cn(
                "p-8 space-y-4",
                blok.background === "navy"
                  ? "bg-white/10 border border-white/20"
                  : "bg-white border border-neutral-dark"
              )}
            >
              <blockquote className={cn(
                "text-base leading-relaxed italic",
                blok.background === "navy" ? "text-white/90" : "text-gray-700"
              )}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2">
                {t.logo?.filename && (
                  <Image
                    src={t.logo.filename}
                    alt={t.company || ""}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain rounded"
                  />
                )}
                <div>
                  {t.name && (
                    <p className={cn(
                      "text-sm font-semibold",
                      blok.background === "navy" ? "text-white" : "text-black"
                    )}>
                      {t.name}
                    </p>
                  )}
                  {t.company && (
                    <p className={cn(
                      "text-xs",
                      blok.background === "navy" ? "text-white/60" : "text-gray-500"
                    )}>
                      {t.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
