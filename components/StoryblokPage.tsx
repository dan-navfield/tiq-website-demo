"use client";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function StoryblokPage({ story }: { story: any }) {
  story = useStoryblokState(story);

  if (!story.content) {
    return null;
  }

  return <StoryblokComponent blok={story.content} />;
}
