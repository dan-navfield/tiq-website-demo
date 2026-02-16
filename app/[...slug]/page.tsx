import { fetchStory } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug ? params.slug.join("/") : "home";

  try {
    const story = await fetchStory(slug);
    return <StoryblokPage story={story} />;
  } catch (e) {
    console.error("Storyblok API Failed:", e);
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Content Load Error
        </h1>
        <p className="mb-4">Could not load story: {slug}</p>
      </div>
    );
  }
}
