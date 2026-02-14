import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({ blok }: { blok: any }) {
  const isExternal = blok.cta_url?.startsWith("http");

  return (
    <section {...storyblokEditable(blok)} className="bg-neutral py-16">
      <div className="max-w-[1232px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded overflow-hidden"
          style={{
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 8px 0px, rgba(0,0,0,0.05) 0px 1px 4px 0px",
          }}
        >
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
            <h2 className="text-[22px] md:text-[28px] font-bold font-heading text-navy leading-snug">
              {blok.headline}
            </h2>

            {blok.cta_text && blok.cta_url && (
              isExternal ? (
                <a
                  href={blok.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tiq-btn tiq-btn-outline-navy self-start"
                >
                  {blok.cta_text}
                </a>
              ) : (
                <Link
                  href={blok.cta_url}
                  className="tiq-btn tiq-btn-outline-navy self-start"
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
