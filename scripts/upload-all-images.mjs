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

async function api(method, path, body) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) { console.error(`  ERROR ${res.status}:`, data); return null; }
  return data;
}

async function uploadImage(filePath, fileName) {
  // Step 1: Get signed URL
  const signedData = await api("POST", "/assets", {
    filename: fileName,
    size: `${fs.statSync(filePath).size}`,
  });
  if (!signedData) return null;

  const { post_url, fields } = signedData;
  const prettyUrl = signedData.pretty_url;

  // Step 2: Upload to S3
  const form = new FormData();
  for (const [key, val] of Object.entries(fields)) {
    form.append(key, val);
  }
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);
  form.append("file", blob, fileName);

  const uploadRes = await fetch(post_url, { method: "POST", body: form });
  if (!uploadRes.ok && uploadRes.status !== 204) {
    console.error(`  S3 upload failed: ${uploadRes.status}`);
    return null;
  }

  // Step 3: Finalize
  const assetId = signedData.id;
  await api("GET", `/assets/${assetId}/finish_upload`);

  console.log(`  Uploaded: ${fileName} -> ${prettyUrl}`);
  return prettyUrl;
}

const images = [
  { file: "tiq-logo-black.png", name: "tiq-logo-black.png" },
  { file: "tiq-logo-white.png", name: "tiq-logo-white.png" },
  { file: "qec-2026-logo.png", name: "qec-2026-logo.png" },
  { file: "hero-connections.jpg", name: "hero-connections.jpg" },
  { file: "news-export-awards.jpg", name: "news-export-awards.jpg" },
  { file: "news-export-awards-2.png", name: "news-export-awards-2.png" },
  { file: "news-expo-mascot.png", name: "news-expo-mascot.png" },
  { file: "queensland-opportunity.jpg", name: "queensland-opportunity.jpg" },
  { file: "readmore-port.jpg", name: "readmore-port.jpg" },
  { file: "readmore-mining.png", name: "readmore-mining.png" },
  { file: "readmore-food.png", name: "readmore-food.png" },
  { file: "readmore-brisbane.jpg", name: "readmore-brisbane.jpg" },
  { file: "icon-qld.png", name: "icon-qld.png" },
  { file: "icon-globe.png", name: "icon-globe.png" },
  { file: "icon-education.png", name: "icon-education.png" },
  { file: "icon-migrate.png", name: "icon-migrate.png" },
];

async function main() {
  console.log("=== Uploading All Images to Storyblok ===\n");
  const imagesDir = resolve(__dirname, "../public/images");
  const urls = {};

  for (const img of images) {
    const filePath = resolve(imagesDir, img.file);
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP: ${img.file} not found`);
      continue;
    }
    const url = await uploadImage(filePath, img.name);
    if (url) urls[img.file] = url;
    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 500));
  }

  console.log("\n=== Upload Complete ===");
  console.log("\nURLs:");
  for (const [file, url] of Object.entries(urls)) {
    console.log(`  ${file}: ${url}`);
  }

  // Save URLs to a JSON file for the next script
  fs.writeFileSync(
    resolve(__dirname, "image-urls.json"),
    JSON.stringify(urls, null, 2)
  );
  console.log("\nSaved to scripts/image-urls.json");
}

main().catch(console.error);
