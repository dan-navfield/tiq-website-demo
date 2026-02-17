import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({ blok }: { blok: any }) {
  const isExternal = blok.cta_url?.startsWith("http");

  return (
    <section {...storyblokEditable(blok)} className="bg-neutral py-[96px]">
      <div className="max-w-[1232px] mx-auto px-4">
        <div className="grid md:grid-cols-[1.8fr_1fr] gap-0 items-center">
          {blok.image?.filename && (
            <div className="aspect-video md:aspect-auto md:min-h-[515px] overflow-hidden">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={832}
                height={515}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:px-12 md:py-10 flex flex-col justify-center space-y-6">
            <h2 className="text-[22px] md:text-[28px] font-bold font-heading text-navy leading-snug">
              {blok.headline}
            </h2>

            {blok.cta_text && blok.cta_url && (
              isExternal ? (
                <a
                  href={blok.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tiq-btn tiq-btn-filled-navy w-full"
                >
                  {blok.cta_text}
                </a>
              ) : (
                <Link
                  href={blok.cta_url}
                  className="tiq-btn tiq-btn-filled-navy w-full"
                >
                  {blok.cta_text}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
