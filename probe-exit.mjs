// Quick visual probe — capture trust-scene at multiple scroll positions
// including fast-scroll, plus exit transition.
import { chromium } from "playwright";

const url = "http://localhost:8080/#studio";
const out = "/tmp";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Get scene bounds
const bounds = await page.evaluate(() => {
  const studio = document.getElementById("studio");
  const scene = studio?.querySelector(".rm-trust-scene");
  if (!scene) return null;
  const rect = scene.getBoundingClientRect();
  return { top: rect.top + window.scrollY, height: rect.height };
});
console.log("scene bounds:", bounds);

// Step 1: anchor at top of scene
await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), bounds.top);
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/exit-00-anchor.png` });

// Step 2: 50% scroll
await page.evaluate((top) => window.scrollTo({ top: top + bounds.height * 0.5, behavior: "instant" }), bounds.top);
await page.waitForTimeout(400);
await page.screenshot({ path: `${out}/exit-50-mid.png` });

// Step 3: FAST scroll to 92% (mid-finale)
await page.evaluate((top) => window.scrollTo({ top: top + bounds.height * 0.92, behavior: "instant" }), bounds.top);
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/exit-92-finale.png` });

// Step 4: VERY FAST scroll - jump 92% → 100% in one frame
await page.evaluate((top) => window.scrollTo({ top: top + bounds.height, behavior: "instant" }), bounds.top);
await page.waitForTimeout(50); // barely a frame
await page.screenshot({ path: `${out}/exit-100-immediate.png` });

// Wait for smoothing to settle
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/exit-100-settled.png` });

// Step 5: back up fast
await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), bounds.top);
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/exit-back-anchor.png` });

await browser.close();
console.log("done — screenshots in /tmp/exit-*.png");
