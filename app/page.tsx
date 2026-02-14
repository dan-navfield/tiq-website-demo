import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get("cdn/stories/home", {
      version: "published",
    });

    return <StoryblokPage story={data.story} />;
  } catch (e) {
    console.error("Failed to fetch home story:", e);
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to TIQ Demo</h1>
        <p className="text-gray-600 mb-6">
          The homepage content has not been created in Storyblok yet.
        </p>
        <p className="text-sm text-gray-400">
          Create a story called &quot;home&quot; with content type &quot;page&quot; in your
          Storyblok space to see the homepage.
        </p>
      </div>
    );
  }
}
