import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

async function uploadAsset(filepath, filename) {
  const fileBuffer = readFileSync(filepath);
  const fileSize = fileBuffer.length;

  // Step 1: Get signed upload URL
  const signedRes = await fetch(`${BASE_URL}/assets`, {
    method: "POST",
    headers: {
      Authorization: OAUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename, size: String(fileSize) }),
  });

  if (!signedRes.ok) {
    console.error(`  Failed to get signed URL for ${filename}: ${signedRes.status}`);
    return null;
  }

  const signed = await signedRes.json();
  const { post_url, fields, pretty_url, id } = signed;

  // Step 2: Upload to S3 using FormData
  const formData = new FormData();

  // Add all signed fields FIRST (order matters for S3)
  for (const [key, value] of Object.entries(fields)) {
    formData.append(key, value);
  }

  // Add file LAST
  const blob = new Blob([fileBuffer], { type: fields["Content-Type"] || "image/png" });
  formData.append("file", blob, filename);

  const uploadRes = await fetch(post_url, {
    method: "POST",
    body: formData,
  });

  if (uploadRes.status === 204 || uploadRes.status === 201) {
    // Step 3: Finalize
    await fetch(`${BASE_URL}/assets/${id}/finish_upload`, {
      method: "PUT",
      headers: {
        Authorization: OAUTH_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const url = `https:${pretty_url}`;
    console.log(`  ✓ ${filename} -> ${url}`);
    return { id, url: `https:${pretty_url}`, pretty_url };
  } else {
    const text = await uploadRes.text();
    console.error(`  ✗ Upload failed for ${filename}: ${uploadRes.status}`);
    return null;
  }
}

async function main() {
  console.log("=== Uploading TIQ Images to Storyblok ===\n");

  const imagesDir = resolve(__dirname, "../public/images");

  const assets = {};

  const files = [
    { file: "tiq-logo-black.png", name: "tiq-logo-black.png" },
    { file: "tiq-logo-white.png", name: "tiq-logo-white.png" },
    { file: "icon-qld.png", name: "icon-qld.png" },
    { file: "icon-globe.png", name: "icon-globe.png" },
    { file: "icon-education.png", name: "icon-education.png" },
    { file: "icon-migrate.png", name: "icon-migrate.png" },
  ];

  for (const { file, name } of files) {
    const result = await uploadAsset(resolve(imagesDir, file), name);
    if (result) {
      assets[name] = result;
    }
  }

  console.log("\n=== Upload complete ===\n");

  // Now update the homepage story with actual Storyblok image URLs
  if (Object.keys(assets).length > 0) {
    console.log("=== Updating homepage with Storyblok image URLs ===\n");

    // Fetch current homepage
    const storyRes = await fetch(`${BASE_URL}/stories?with_slug=home`, {
      headers: { Authorization: OAUTH_TOKEN },
    });
    const storyData = await storyRes.json();
    const homeStory = storyData.stories.find((s) => s.slug === "home");

    if (!homeStory) {
      console.error("Home story not found!");
      return;
    }

    const content = homeStory.content;

    // Update dual_cta_cards icons
    if (content.body) {
      for (const block of content.body) {
        // Update CTA cards with icons
        if (block.component === "dual_cta_cards" && block.cards) {
          for (const card of block.cards) {
            if (card.heading?.includes("Investing") && assets["icon-qld.png"]) {
              card.icon = { filename: assets["icon-qld.png"].url, alt: "Queensland" };
              console.log("  Updated Invest card icon");
            }
            if (card.heading?.includes("Exporting") && assets["icon-globe.png"]) {
              card.icon = { filename: assets["icon-globe.png"].url, alt: "Globe" };
              console.log("  Updated Export card icon");
            }
          }
        }

        // Update icon_text_card blocks
        if (block.component === "icon_text_card") {
          if (block.heading?.includes("Study") && assets["icon-education.png"]) {
            block.icon = { filename: assets["icon-education.png"].url, alt: "Education" };
            console.log("  Updated Study card icon");
          }
          if (block.heading?.includes("Migrate") && assets["icon-migrate.png"]) {
            block.icon = { filename: assets["icon-migrate.png"].url, alt: "Migration" };
            console.log("  Updated Migrate card icon");
          }
        }
      }
    }

    // Save updated story
    const updateRes = await fetch(`${BASE_URL}/stories/${homeStory.id}`, {
      method: "PUT",
      headers: {
        Authorization: OAUTH_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: {
          name: homeStory.name,
          slug: homeStory.slug,
          content,
        },
        publish: 1,
      }),
    });

    if (updateRes.ok) {
      console.log("\n  Homepage updated with Storyblok image URLs!");
    } else {
      console.error("  Failed to update homepage:", updateRes.status);
    }
  }

  console.log("\n=== All done! ===");
}

main().catch(console.error);
