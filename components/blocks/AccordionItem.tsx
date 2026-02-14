import { storyblokEditable } from "@storyblok/react";

export default function AccordionItem({ blok }: { blok: any }) {
  return <div {...storyblokEditable(blok)} />;
}
