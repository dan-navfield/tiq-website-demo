import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "../screenshots");

const sections = [
  { name: "header", y: 0, h: 150 },
  { name: "hero", y: 60, h: 400 },
  { name: "cta-cards", y: 430, h: 250 },
  { name: "news", y: 660, h: 350 },
  { name: "featured", y: 990, h: 300 },
  { name: "readmore", y: 1270, h: 500 },
  { name: "cta-footer", y: 1800, h: 600 },
];

async function main() {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // Real site
  const realPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await realPage.goto("https://www.tiq.qld.gov.au/", { waitUntil: "networkidle", timeout: 30000 });
  await realPage.waitForTimeout(3000);
  // Dismiss cookie banner
  try {
    await realPage.click('button:has-text("Allow All")', { timeout: 2000 });
  } catch {}
  await realPage.waitForTimeout(500);

  for (const s of sections) {
    await realPage.screenshot({
      path: resolve(outputDir, `real-${s.name}.png`),
      clip: { x: 0, y: s.y, width: 1440, height: s.h },
    });
  }
  console.log("Real site sections captured");

  // Clone
  const clonePage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await clonePage.goto("http://localhost:3099", { waitUntil: "networkidle", timeout: 30000 });
  await clonePage.waitForTimeout(2000);

  // Get clone section positions (they may differ)
  const cloneHeight = await clonePage.evaluate(() => document.body.scrollHeight);
  console.log(`Clone page height: ${cloneHeight}`);

  // Take full page for reference
  await clonePage.screenshot({ path: resolve(outputDir, "clone-full.png"), fullPage: true });
  await realPage.screenshot({ path: resolve(outputDir, "real-full.png"), fullPage: true });

  await browser.close();
  console.log("All screenshots saved");
}

main().catch(console.error);
