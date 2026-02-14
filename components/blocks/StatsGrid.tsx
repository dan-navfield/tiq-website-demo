import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { cn } from "@/lib/utils";

export default function StatsGrid({ blok }: { blok: any }) {
  const bgClass = blok.background === "navy" ? "bg-navy text-white" : "bg-neutral text-black";

  return (
    <section {...storyblokEditable(blok)} className={cn("tiq-section", bgClass)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {blok.heading && (
          <h2 className={cn(
            "text-2xl md:text-3xl font-bold mb-10 text-center",
            blok.background === "navy" ? "text-white" : "text-black"
          )}>
            {blok.heading}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blok.items?.map((item: any) => (
            <StoryblokComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
