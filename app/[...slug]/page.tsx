import { getStoryblokApi } from "@/lib/storyblok";
import StoryblokPage from "@/components/StoryblokPage";

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug ? params.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: "draft",
    });

    return <StoryblokPage story={data.story} />;
  } catch (e) {
    console.error("Storyblok API Failed:", e);
    return (
      <div className="p-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Content Load Error
        </h1>
        <p className="mb-4">Could not load story: {slug}</p>
        <code className="block bg-gray-100 p-4 rounded text-left overflow-auto max-w-xl mx-auto text-sm">
          {JSON.stringify(e, null, 2)}
        </code>
      </div>
    );
  }
}

export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  try {
    const { data } = await storyblokApi.get("cdn/links", {
      version: "draft",
    });

    if (!data || !data.links) {
      return [];
    }

    const paths: { slug: string[] }[] = [];
    const links = data.links as Record<string, any>;

    Object.keys(links).forEach((linkKey) => {
      const link = links[linkKey];
      if (!link.is_folder && link.slug !== "home") {
        paths.push({ slug: link.slug.split("/") });
      }
    });

    return paths;
  } catch (e) {
    console.error("Error generating static params:", e);
    return [];
  }
}
