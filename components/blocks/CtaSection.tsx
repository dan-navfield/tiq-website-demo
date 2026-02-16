import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function CtaSection({ blok }: { blok: any }) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative bg-navy overflow-hidden"
      style={{
        background: "linear-gradient(235deg, #000033 30%, #000066 100%)",
      }}
    >
      <div className="relative max-w-[768px] mx-auto px-4 py-[96px]">
        <div className="text-center space-y-8">
          {blok.heading && (
            <h2 className="text-[40px] font-bold font-heading text-tiq-aqua leading-[48px]">
              {blok.heading}
            </h2>
          )}

          {blok.description && (
            <p className="text-white/80 text-lg leading-7">
              {blok.description}
            </p>
          )}

          {blok.button_text && blok.button_url && (
            <div className="pt-6">
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
