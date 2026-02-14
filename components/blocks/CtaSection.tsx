import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function CtaSection({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-navy overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000033 0%, #000044 50%, #0a0a4a 100%)",
      }}
    >
      <div className="relative max-w-[1232px] mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          {blok.heading && (
            <h2 className="text-[40px] font-bold font-heading text-tiq-aqua leading-[48px]">
              {blok.heading}
            </h2>
          )}

          {blok.description && (
            <p className="text-white/80 text-base leading-6">
              {blok.description}
            </p>
          )}

          {blok.button_text && blok.button_url && (
            <div className="pt-3">
              <Link href={blok.button_url} className="tiq-btn tiq-btn-light">
                {blok.button_text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
