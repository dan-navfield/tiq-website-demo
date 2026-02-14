import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function NewsGrid({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {blok.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-10">
            {blok.heading}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blok.items?.map((item: any) => (
            <StoryblokComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
