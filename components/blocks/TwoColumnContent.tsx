import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TwoColumnContent({ blok }: { blok: any }) {
  const imageRight = blok.layout === "image_right";
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "grid md:grid-cols-2 gap-10 md:gap-16 items-center",
          imageRight && "direction-rtl"
        )}>
          {/* Image */}
          {blok.image?.filename && (
            <div className={cn(imageRight && "md:order-2")}>
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={640}
                height={440}
                className="w-full h-auto rounded-sm"
              />
            </div>
          )}

          {/* Text Content */}
          <div className={cn("space-y-5", imageRight && "md:order-1")}>
            {blok.eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {blok.eyebrow}
              </p>
            )}

            {blok.heading && (
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                {blok.heading}
              </h2>
            )}

            {blok.body && (
              <div className="text-gray-600 text-base leading-relaxed space-y-4">
                {blok.body.split("\n\n").map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {blok.cta_text && blok.cta_url && (
              <div className="pt-2">
                <Link href={blok.cta_url} className="tiq-btn">
                  {blok.cta_text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
