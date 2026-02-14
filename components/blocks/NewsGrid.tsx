import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function NewsGrid({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-white py-16 md:py-20">
      <div className="max-w-[1232px] mx-auto px-4">
        {blok.heading && (
          <h2 className="text-[40px] font-bold font-heading text-navy text-center leading-[48px] mb-4">
            {blok.heading}
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {blok.items?.map((item: any) => (
            <StoryblokComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
