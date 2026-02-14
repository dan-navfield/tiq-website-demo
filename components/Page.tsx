import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import ReadMoreItem from "@/components/blocks/ReadMoreItem";

const Page = ({ blok }: { blok: any }) => {
  // Group consecutive icon_text_card blocks into a card row,
  // and pull overflow items from a preceding read_more_grid to join them
  const grouped: any[] = [];
  let iconCardBuffer: any[] = [];

  const flushBuffer = () => {
    if (iconCardBuffer.length > 0) {
      // Check if the previous grouped item is a read_more_grid with >3 items
      // If so, pull the overflow items into this row
      const prev = grouped[grouped.length - 1];
      const overflowItems: any[] = [];
      if (prev?.component === "read_more_grid" && prev.items?.length > 3) {
        // Pull items beyond the first 3
        const overflow = prev.items.splice(3);
        overflowItems.push(...overflow);
      }
      grouped.push({
        _type: "icon_card_row",
        overflowItems,
        items: [...iconCardBuffer],
      });
      iconCardBuffer = [];
    }
  };

  for (const nestedBlok of blok.body || []) {
    if (nestedBlok.component === "icon_text_card") {
      iconCardBuffer.push(nestedBlok);
    } else {
      flushBuffer();
      grouped.push(nestedBlok);
    }
  }
  flushBuffer();

  return (
    <main {...storyblokEditable(blok)} className="flex min-h-screen flex-col">
      {grouped.map((item: any, i: number) => {
        if (item._type === "icon_card_row") {
          const totalItems = item.overflowItems.length + item.items.length;
          const cols = totalItems >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2";
          return (
            <section key={`icon-row-${i}`} className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className={`grid ${cols} gap-6`}>
                  {item.overflowItems.map((rm: any) => (
                    <ReadMoreItem blok={rm} key={rm._uid} />
                  ))}
                  {item.items.map((card: any) => (
                    <StoryblokComponent blok={card} key={card._uid} />
                  ))}
                </div>
              </div>
            </section>
          );
        }
        return <StoryblokComponent blok={item} key={item._uid} />;
      })}
    </main>
  );
};

export default Page;
