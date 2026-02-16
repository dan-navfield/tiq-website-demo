import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TextSection({ blok }: { blok: any }) {
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";

  // Split body into paragraphs, detect bullet lines (starting with "• " or "- ")
  const paragraphs = blok.body ? blok.body.split("\n\n") : [];
  const isBulletList = paragraphs.some((p: string) => p.trimStart().startsWith("• ") || p.trimStart().startsWith("- "));

  return (
    <section {...storyblokEditable(blok)} className={cn("py-10 md:py-14", bgClass)}>
      <div className="max-w-[1232px] mx-auto px-4">
        <div className="max-w-4xl">
          {blok.heading && (
            <h2 className="text-[22px] md:text-[26px] font-bold font-heading text-black mb-5">
              {blok.heading}
            </h2>
          )}

          {blok.body && (
            <div className="text-[16px] leading-[24px] text-[#333338] space-y-3">
              {isBulletList ? (
                <ul className="list-disc list-outside pl-5 space-y-2">
                  {paragraphs.map((line: string, i: number) => {
                    const text = line.replace(/^[•\-]\s*/, "").trim();
                    return text ? <li key={i}>{text}</li> : null;
                  })}
                </ul>
              ) : (
                paragraphs.map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              )}
            </div>
          )}

          {/* CTA buttons */}
          {blok.cta_text && blok.cta_url && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={blok.cta_url} className="tiq-btn tiq-btn-fluro">
                {blok.cta_text}
              </Link>
              {blok.cta_secondary_text && blok.cta_secondary_url && (
                <Link href={blok.cta_secondary_url} className="tiq-btn tiq-btn-fluro">
                  {blok.cta_secondary_text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
