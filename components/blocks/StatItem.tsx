import { storyblokEditable } from "@storyblok/react";

export default function StatItem({ blok }: { blok: any }) {
  return (
    <div {...storyblokEditable(blok)} className="text-center space-y-2">
      {blok.number && (
        <p className="text-4xl md:text-5xl font-bold">{blok.number}</p>
      )}
      {blok.label && (
        <p className="text-sm opacity-70 leading-snug">{blok.label}</p>
      )}
    </div>
  );
}
