"use client";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function StoryblokPage({
  story,
  language,
}: {
  story: any;
  language?: string;
}) {
  story = useStoryblokState(story, { language });

  if (!story.content) {
    return null;
  }

  return <StoryblokComponent blok={story.content} />;
}
