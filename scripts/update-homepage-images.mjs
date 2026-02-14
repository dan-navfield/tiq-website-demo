import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

const STORY_ID = 144843220299439;

// Storyblok asset URLs from upload
const assets = {
  "icon-qld": "https://a.storyblok.com/f/290527677944998/1307/0f0b459eb7/icon-qld.png",
  "icon-globe": "https://a.storyblok.com/f/290527677944998/1061/007224048d/icon-globe.png",
  "icon-education": "https://a.storyblok.com/f/290527677944998/1485/f3195cd1dd/icon-education.png",
  "icon-migrate": "https://a.storyblok.com/f/290527677944998/2154/9976dad1d6/icon-migrate.png",
};

async function main() {
  console.log("=== Updating Homepage Images ===\n");

  // Fetch full story
  const res = await fetch(`${BASE_URL}/stories/${STORY_ID}`, {
    headers: { Authorization: OAUTH_TOKEN },
  });

  if (!res.ok) {
    console.error("Failed to fetch story:", res.status);
    return;
  }

  const { story } = await res.json();
  const content = story.content;

  if (!content || !content.body) {
    console.error("Story has no content body!");
    return;
  }

  // Update blocks with images
  for (const block of content.body) {
    if (block.component === "dual_cta_cards" && block.cards) {
      for (const card of block.cards) {
        if (card.heading?.includes("Investing")) {
          card.icon = { filename: assets["icon-qld"], alt: "Queensland" };
          console.log("  ✓ Updated Invest card icon");
        }
        if (card.heading?.includes("Exporting")) {
          card.icon = { filename: assets["icon-globe"], alt: "Globe" };
          console.log("  ✓ Updated Export card icon");
        }
      }
    }

    if (block.component === "icon_text_card") {
      if (block.heading?.includes("Study")) {
        block.icon = { filename: assets["icon-education"], alt: "Education" };
        console.log("  ✓ Updated Study card icon");
      }
      if (block.heading?.includes("Migrate")) {
        block.icon = { filename: assets["icon-migrate"], alt: "Migration" };
        console.log("  ✓ Updated Migrate card icon");
      }
    }
  }

  // Save
  const updateRes = await fetch(`${BASE_URL}/stories/${STORY_ID}`, {
    method: "PUT",
    headers: {
      Authorization: OAUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      story: { name: story.name, slug: story.slug, content },
      publish: 1,
    }),
  });

  if (updateRes.ok) {
    console.log("\n  Homepage updated and published with Storyblok image URLs!");
  } else {
    const err = await updateRes.text();
    console.error("  Failed:", updateRes.status, err);
  }
}

main().catch(console.error);
