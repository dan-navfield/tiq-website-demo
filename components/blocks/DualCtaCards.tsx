import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function DualCtaCards({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {blok.cards?.map((card: any) => (
            <StoryblokComponent blok={card} key={card._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
