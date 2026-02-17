import { storyblokEditable } from "@storyblok/react";

export default function VideoEmbed({ blok }: { blok: any }) {
  // Extract Vimeo ID from URL
  const vimeoId = blok.url?.match(/vimeo\.com\/(\d+)/)?.[1];

  if (!vimeoId) return null;

  return (
    <section {...storyblokEditable(blok)} className="py-10 md:py-14 bg-white">
      <div className="max-w-[1232px] mx-auto px-4">
        <div>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?h=0&badge=0&autopause=0&player_id=0&app_id=58479`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={blok.title || "Video"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
