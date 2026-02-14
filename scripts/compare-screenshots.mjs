import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "../screenshots");

async function takeScreenshot(url, name, browser) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Dismiss cookie banners etc
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2000);

  // Try to dismiss any cookie/alert banners
  try {
    const closeButtons = await page.$$('button[aria-label="Dismiss"], button[aria-label="Close"]');
    for (const btn of closeButtons) {
      await btn.click().catch(() => {});
    }
  } catch {}

  await page.waitForTimeout(500);

  await page.screenshot({
    path: resolve(outputDir, `${name}.png`),
    fullPage: true,
  });

  console.log(`Screenshot saved: ${name}.png`);
  await page.close();
}

async function main() {
  // Create output dir
  const fs = await import("fs");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log("Taking screenshots...\n");

  await takeScreenshot("https://www.tiq.qld.gov.au/", "tiq-real", browser);
  await takeScreenshot("http://localhost:3099", "tiq-clone", browser);

  await browser.close();
  console.log(`\nScreenshots saved to: ${outputDir}`);
}

main().catch(console.error);
