import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

const Page = ({ blok }: { blok: any }) => (
  <main {...storyblokEditable(blok)} className="flex min-h-screen flex-col">
    {blok.body?.map((nestedBlok: any) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
