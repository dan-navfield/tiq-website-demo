"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Accordion({ blok }: { blok: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section {...storyblokEditable(blok)} className="tiq-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blok.heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            {blok.heading}
          </h2>
        )}

        <div className="max-w-3xl border-t border-neutral-dark">
          {blok.items?.map((item: any, i: number) => (
            <div key={item._uid || i} className="border-b border-neutral-dark">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full py-5 text-left group"
              >
                <span className="text-base font-semibold text-black group-hover:text-navy transition-colors pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "text-gray-400 flex-shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p className="text-gray-600 text-[15px] leading-relaxed pr-10">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
