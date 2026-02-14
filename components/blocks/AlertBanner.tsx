"use client";

import { useState } from "react";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";
import { X, Info } from "lucide-react";

export default function AlertBanner({ blok }: { blok: any }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      {...storyblokEditable(blok)}
      className="bg-tiq-aqua"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Info size={18} className="text-white flex-shrink-0" />
          <p className="text-sm text-white truncate sm:whitespace-normal">
            <span>{blok.message}</span>
            {blok.link_text && blok.link_url && (
              <>
                {" "}
                <Link
                  href={blok.link_url}
                  className="font-semibold text-white underline hover:no-underline"
                >
                  {blok.link_text} &rarr;
                </Link>
              </>
            )}
          </p>
        </div>
        {blok.dismissible !== false && (
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white flex-shrink-0 p-1"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
