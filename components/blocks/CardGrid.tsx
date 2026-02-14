import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { cn } from "@/lib/utils";

export default function CardGrid({ blok }: { blok: any }) {
  const cols = blok.columns || "3";
  const bgClass = blok.background === "neutral" ? "bg-neutral" : "bg-white";

  const gridCols: Record<string, string> = {
    "2": "sm:grid-cols-2",
    "3": "sm:grid-cols-2 lg:grid-cols-3",
    "4": "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blok.heading && (
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
            {blok.heading}
          </h2>
        )}

        {blok.description && (
          <p className="text-gray-600 text-base leading-relaxed mb-10 max-w-3xl">
            {blok.description}
          </p>
        )}

        <div className={cn("grid gap-6", gridCols[cols] || gridCols["3"])}>
          {blok.cards?.map((card: any) => (
            <StoryblokComponent blok={card} key={card._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
