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

async function main() {
  const filePath = resolve(__dirname, "../public/images/hero-bg.jpg");
  const fileName = "hero-bg.jpg";

  console.log("Uploading hero background...");

  // Step 1: Get signed URL
  const signedData = await api("POST", "/assets", {
    filename: fileName,
    size: `${fs.statSync(filePath).size}`,
  });
  if (!signedData) return;

  // Step 2: Upload to S3
  const form = new FormData();
  for (const [key, val] of Object.entries(signedData.fields)) {
    form.append(key, val);
  }
  form.append("file", new Blob([fs.readFileSync(filePath)]), fileName);

  const uploadRes = await fetch(signedData.post_url, { method: "POST", body: form });
  if (!uploadRes.ok && uploadRes.status !== 204) {
    console.error(`S3 upload failed: ${uploadRes.status}`);
    return;
  }

  // Step 3: Finalize
  await api("GET", `/assets/${signedData.id}/finish_upload`);
  console.log(`Uploaded: ${signedData.pretty_url}`);

  // Update image-urls.json
  const urlsPath = resolve(__dirname, "image-urls.json");
  const urls = JSON.parse(fs.readFileSync(urlsPath, "utf8"));
  urls["hero-bg.jpg"] = signedData.pretty_url;
  fs.writeFileSync(urlsPath, JSON.stringify(urls, null, 2));
  console.log("Updated image-urls.json");
}

main().catch(console.error);
