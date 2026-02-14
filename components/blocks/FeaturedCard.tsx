import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({ blok }: { blok: any }) {
  const isExternal = blok.cta_url?.startsWith("http");

  return (
    <section {...storyblokEditable(blok)} className="bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-0 bg-white overflow-hidden">
          {blok.image?.filename && (
            <div className="aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden bg-gray-100">
              <Image
                src={blok.image.filename}
                alt={blok.image.alt || ""}
                width={800}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
            <h2 className="text-2xl md:text-[28px] font-bold text-black leading-snug">
              {blok.headline}
            </h2>

            {blok.cta_text && blok.cta_url && (
              isExternal ? (
                <a
                  href={blok.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tiq-btn tiq-btn-filled-navy inline-block"
                >
                  {blok.cta_text}
                </a>
              ) : (
                <Link
                  href={blok.cta_url}
                  className="tiq-btn tiq-btn-filled-navy inline-block"
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
