import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { Authorization: OAUTH_TOKEN, "Content-Type": "application/json" };

const urls = JSON.parse(fs.readFileSync(resolve(__dirname, "image-urls.json"), "utf8"));

// Convert // prefix to https://
function u(key) {
  const url = urls[key];
  return url?.startsWith("//") ? `https:${url}` : url;
}

async function api(method, path, body) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) { console.error(`  ERROR ${res.status} on ${path}:`, data); return null; }
  return data;
}

async function main() {
  console.log("=== Updating Homepage With Images ===\n");

  // Fetch home story
  const storiesData = await api("GET", "/stories?with_slug=home");
  if (!storiesData?.stories?.length) {
    console.error("Home story not found!");
    return;
  }
  const storyId = storiesData.stories[0].id;
  const storyData = await api("GET", `/stories/${storyId}`);
  const story = storyData.story;
  const body = story.content.body;

  for (const block of body) {
    switch (block.component) {
      case "hero_section":
        console.log("Updating hero_section with QEC logo and background image...");
        block.image = { filename: u("qec-2026-logo.png"), alt: "Queensland Exporter Conference 2026" };
        // Add a background_image field for the hero bg
        block.background_image = { filename: u("hero-bg.jpg"), alt: "Queensland business" };
        break;

      case "dual_cta_cards":
        console.log("Updating dual_cta_cards with icons...");
        if (block.cards) {
          for (const card of block.cards) {
            if (card.heading?.includes("Investing")) {
              card.icon = { filename: u("icon-qld.png"), alt: "Queensland icon" };
            } else if (card.heading?.includes("Exporting")) {
              card.icon = { filename: u("icon-globe.png"), alt: "Globe icon" };
            }
          }
        }
        break;

      case "news_grid":
        console.log("Updating news_grid with images...");
        if (block.items) {
          const newsImages = [
            { key: "news-export-awards.jpg", alt: "Premier of Queensland's Export Awards" },
            { key: "news-export-awards-2.png", alt: "Queensland Export Awards 2025" },
            { key: "news-expo-mascot.png", alt: "World Expo 2025 Osaka" },
          ];
          for (let i = 0; i < block.items.length && i < newsImages.length; i++) {
            block.items[i].image = { filename: u(newsImages[i].key), alt: newsImages[i].alt };
          }
        }
        break;

      case "featured_card":
        console.log("Updating featured_card with QueensLand of Opportunity image...");
        block.image = { filename: u("queensland-opportunity.jpg"), alt: "QueensLand of Opportunity" };
        break;

      case "read_more_grid":
        console.log("Updating read_more_grid with images...");
        if (block.items) {
          const rmImages = [
            { key: "readmore-port.jpg", alt: "About Queensland" },
            { key: "readmore-mining.png", alt: "Investment opportunities" },
            { key: "readmore-food.png", alt: "Choose Queensland" },
            { key: "readmore-brisbane.jpg", alt: "Market Profiles" },
          ];
          for (let i = 0; i < block.items.length && i < rmImages.length; i++) {
            block.items[i].image = { filename: u(rmImages[i].key), alt: rmImages[i].alt };
          }
        }
        break;

      case "icon_text_card":
        if (block.heading?.includes("Study")) {
          console.log("Updating Study card with education icon...");
          block.icon = { filename: u("icon-education.png"), alt: "Education icon" };
        } else if (block.heading?.includes("Migrate")) {
          console.log("Updating Migrate card with globe icon...");
          block.icon = { filename: u("icon-migrate.png"), alt: "Migrate icon" };
        }
        break;
    }
  }

  // Save updated story
  console.log("\nSaving updated home story...");
  await api("PUT", `/stories/${storyId}`, {
    story: { content: story.content },
    publish: 1,
  });
  console.log("Homepage updated with all images and published!");
}

main().catch(console.error);
