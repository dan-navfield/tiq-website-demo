"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Info } from "lucide-react";

export function SiteAlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-tiq-aqua relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Info size={18} className="text-navy flex-shrink-0" />
          <p className="text-base text-navy truncate sm:whitespace-normal">
            <span>Tariff updates - support for Queensland businesses.</span>{" "}
            <Link
              href="/news-and-events/tariffs"
              className="font-semibold text-navy underline hover:no-underline"
            >
              Learn more -&gt;
            </Link>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-navy/60 hover:text-navy flex-shrink-0 p-1"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
