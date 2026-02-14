import { storyblokEditable } from "@storyblok/react";

export default function BreadcrumbItem({ blok }: { blok: any }) {
  return <span {...storyblokEditable(blok)}>{blok.label}</span>;
}
