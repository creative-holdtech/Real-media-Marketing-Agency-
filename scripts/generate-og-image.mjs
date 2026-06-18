/**
 * Generates public/og.png (1200×630) for social previews.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "og.png");

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0b0b"/>
  <text x="600" y="300" text-anchor="middle" fill="#ffffff"
    font-family="Inter, Arial, sans-serif" font-size="120" font-weight="700" letter-spacing="-4">R—M</text>
  <text x="600" y="390" text-anchor="middle" fill="#a3a3a3"
    font-family="Inter, Arial, sans-serif" font-size="28" font-weight="400" letter-spacing="0.2em">STRATEGY &amp; EXECUTION</text>
  <circle cx="700" cy="268" r="14" fill="#ff7a59"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`[seo] Wrote ${out}`);
