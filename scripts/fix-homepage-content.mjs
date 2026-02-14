import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { Authorization: OAUTH_TOKEN, "Content-Type": "application/json" };

async function api(method, path, body) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) { console.error(`  ERROR ${res.status} on ${path}:`, data); return null; }
  return data;
}

async function main() {
  console.log("=== Fixing Homepage Content ===\n");

  const storiesData = await api("GET", "/stories?with_slug=home");
  const storyId = storiesData.stories[0].id;
  const storyData = await api("GET", `/stories/${storyId}`);
  const story = storyData.story;
  const body = story.content.body;

  // 1. Fix news_grid: remove the 4th item if there are more than 3
  for (const block of body) {
    if (block.component === "news_grid" && block.items?.length > 3) {
      console.log(`News grid has ${block.items.length} items, trimming to 3`);
      block.items = block.items.slice(0, 3);
    }
  }

  // 2. Fix read_more_grid: ensure only 3 items in first row (remove Market Profiles to be separate below)
  // Actually keep all 4 items - the grid wraps naturally with 3 columns

  console.log("\nSaving...");
  await api("PUT", `/stories/${storyId}`, {
    story: { content: story.content },
    publish: 1,
  });
  console.log("Done!");
}

main().catch(console.error);
