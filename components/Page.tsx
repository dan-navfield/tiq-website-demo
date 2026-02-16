import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { useMemo } from "react";
import ReadMoreItem from "@/components/blocks/ReadMoreItem";

const Page = ({ blok }: { blok: any }) => {
  // Group consecutive icon_text_card blocks into a card row,
  // and pull overflow items from a preceding read_more_grid to join them.
  // useMemo ensures consistent grouping between server and client renders.
  const grouped = useMemo(() => {
    const result: any[] = [];
    let iconCardBuffer: any[] = [];

    const flushBuffer = () => {
      if (iconCardBuffer.length > 0) {
        const prev = result[result.length - 1];
        const overflowItems: any[] = [];
        if (prev?.component === "read_more_grid" && prev._trimmedItems) {
          overflowItems.push(...prev._trimmedItems);
        }
        result.push({
          _type: "icon_card_row",
          overflowItems,
          items: [...iconCardBuffer],
        });
        iconCardBuffer = [];
      }
    };

    for (const nestedBlok of blok.body || []) {
      // Skip alert_banner blocks — handled by SiteAlertBanner in layout
      if (nestedBlok.component === "alert_banner") continue;

      if (nestedBlok.component === "icon_text_card") {
        iconCardBuffer.push(nestedBlok);
      } else {
        flushBuffer();
        // For read_more_grid with >3 items, create a copy with trimmed items
        // (don't mutate the original Storyblok data)
        if (nestedBlok.component === "read_more_grid" && nestedBlok.items?.length > 3) {
          result.push({
            ...nestedBlok,
            items: nestedBlok.items.slice(0, 3),
            _trimmedItems: nestedBlok.items.slice(3),
          });
        } else {
          result.push(nestedBlok);
        }
      }
    }
    flushBuffer();
    return result;
  }, [blok.body]);

  return (
    <div {...storyblokEditable(blok)} className="flex flex-col">
      {grouped.map((item: any, i: number) => {
        if (item._type === "icon_card_row") {
          const totalItems = item.overflowItems.length + item.items.length;
          const cols = totalItems >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2";
          return (
            <section key={`icon-row-${i}`} style={{ backgroundColor: "rgb(234,234,247)" }}>
              <div className="max-w-[1232px] mx-auto px-4 pb-[96px]">
                <div className={`grid ${cols} gap-4`}>
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
    </div>
  );
};

export default Page;
