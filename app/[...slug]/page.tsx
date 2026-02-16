import { fetchStory, SUPPORTED_LANGUAGES } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export const dynamic = "force-dynamic";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const segments = [...(params.slug || [])];

  // Check if the first segment is a language code
  let language: string | undefined;
  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0])) {
    language = segments.shift();
  }

  // Remaining segments form the story slug (default to "home" if empty)
  const slug = segments.length > 0 ? segments.join("/") : "home";

  try {
    const story = await fetchStory(slug, language);
    return <StoryblokPage story={story} language={language} />;
  } catch (e) {
    console.error("Storyblok API Failed:", e);
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Content Load Error
        </h1>
        <p className="mb-4">Could not load story: {language ? `${language}/` : ""}{slug}</p>
      </div>
    );
  }
}
