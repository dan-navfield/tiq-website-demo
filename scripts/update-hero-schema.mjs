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
  if (!res.ok) { console.error(`  ERROR ${res.status}:`, data); return null; }
  return data;
}

async function main() {
  const compData = await api("GET", "/components");
  const comps = {};
  for (const c of compData.components) comps[c.name] = c;

  if (comps.hero_section) {
    console.log("Adding background_image field to hero_section...");
    const schema = {
      ...comps.hero_section.schema,
      background_image: { type: "asset", display_name: "Background Image", filetypes: ["images"] },
    };
    await api("PUT", `/components/${comps.hero_section.id}`, {
      component: { ...comps.hero_section, schema },
    });
    console.log("Done!");
  }
}

main().catch(console.error);
