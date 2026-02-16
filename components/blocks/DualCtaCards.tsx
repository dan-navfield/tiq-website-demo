import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function DualCtaCards({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white">
      <div className="max-w-[1232px] mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-2 gap-3">
          {blok.cards?.map((card: any, i: number) => {
            // First card aqua, second card navy — matches real TIQ site
            const themedCard = { ...card, theme: i === 0 ? "aqua" : "navy" };
            return <StoryblokComponent blok={themedCard} key={card._uid} />;
          })}
        </div>
      </div>
    </section>
  );
}
