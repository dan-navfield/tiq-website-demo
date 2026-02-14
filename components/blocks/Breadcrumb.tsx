import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ blok }: { blok: any }) {
  const items = blok.items || [];

  return (
    <nav
      {...storyblokEditable(blok)}
      className="bg-navy/5 border-b border-neutral-dark"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-1.5 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-navy transition-colors">
              Home
            </Link>
          </li>
          {items.map((item: any, i: number) => (
            <li key={item._uid || i} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-gray-400" />
              {i === items.length - 1 ? (
                <span className="text-gray-800 font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.url || "#"}
                  className="text-gray-500 hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
