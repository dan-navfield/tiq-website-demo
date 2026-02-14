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
      className="bg-neutral border-b-2 border-neutral-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Info size={18} className="text-navy flex-shrink-0" />
          <p className="text-sm text-gray-800 truncate sm:whitespace-normal">
            <span>{blok.message}</span>
            {blok.link_text && blok.link_url && (
              <>
                {" — "}
                <Link
                  href={blok.link_url}
                  className="font-semibold text-navy underline hover:no-underline"
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
            className="text-gray-500 hover:text-gray-800 flex-shrink-0 p-1"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
