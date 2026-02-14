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
  console.log("=== Updating Schemas & Content ===\n");

  // 1. Get existing components
  const compData = await api("GET", "/components");
  const comps = {};
  for (const c of compData.components) comps[c.name] = c;

  // 2. Update icon_text_card schema to add background option
  if (comps.icon_text_card) {
    console.log("Updating icon_text_card schema (adding background field)...");
    const schema = {
      ...comps.icon_text_card.schema,
      background: {
        type: "option",
        display_name: "Background",
        options: [
          { name: "White", value: "white" },
          { name: "Aqua", value: "aqua" },
          { name: "Navy", value: "navy" },
        ],
        default_value: "white",
      },
    };
    await api("PUT", `/components/${comps.icon_text_card.id}`, {
      component: { ...comps.icon_text_card, schema },
    });
  }

  // 3. Update read_more_item schema to add image field
  if (comps.read_more_item) {
    console.log("Updating read_more_item schema (adding image field)...");
    const schema = {
      ...comps.read_more_item.schema,
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
    };
    await api("PUT", `/components/${comps.read_more_item.id}`, {
      component: { ...comps.read_more_item, schema },
    });
  }

  // 4. Update news_item schema to add image field if not present
  if (comps.news_item && !comps.news_item.schema?.image) {
    console.log("Updating news_item schema (adding image field)...");
    const schema = {
      ...comps.news_item.schema,
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
    };
    await api("PUT", `/components/${comps.news_item.id}`, {
      component: { ...comps.news_item, schema },
    });
  }

  // 5. Get home story
  console.log("\nFetching home story...");
  const storiesData = await api("GET", "/stories?with_slug=home");
  if (!storiesData?.stories?.length) {
    console.error("Home story not found!");
    return;
  }
  const storyId = storiesData.stories[0].id;
  const storyData = await api("GET", `/stories/${storyId}`);
  const story = storyData.story;
  const body = story.content.body;

  // 6. Update icon_text_card blocks with background values
  let updated = false;
  for (const block of body) {
    if (block.component === "icon_text_card") {
      if (block.heading?.toLowerCase().includes("study")) {
        block.background = "aqua";
        console.log("Set Study card to aqua background");
        updated = true;
      } else if (block.heading?.toLowerCase().includes("migrate")) {
        block.background = "navy";
        console.log("Set Migrate card to navy background");
        updated = true;
      }
    }
  }

  if (updated) {
    console.log("\nSaving updated home story...");
    await api("PUT", `/stories/${storyId}`, {
      story: { content: story.content },
      publish: 1,
    });
    console.log("Home story updated and published!");
  }

  console.log("\n=== Done! ===");
}

main().catch(console.error);
