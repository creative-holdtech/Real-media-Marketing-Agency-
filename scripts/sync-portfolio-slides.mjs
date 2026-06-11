#!/usr/bin/env node
/**
 * Copy Portfolio_RM slide exports into public/cases/{slug}/.
 * Export slides from Figma as 11.png, 12.png, … into ~/Downloads/Portfolio_RM/
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "cases");
const SOURCE = process.env.PORTFOLIO_RM_DIR ?? join(homedir(), "Downloads", "Portfolio_RM");

/** Figma slide number → output filename */
const DECK = {
  empresex: {
    cover: 12,
    overview: 12,
    identity: 11,
    deliverables: 13,
    platform: 14,
  },
  "tequila-cpa": {
    cover: 15,
    overview: 16,
    identity: 18,
    deliverables: 21,
    platform: 22,
  },
  progresivo: {
    cover: 29,
    overview: 30,
    identity: 31,
    deliverables: 33,
    platform: 34,
  },
};

function copySlide(slug, role, slideNum) {
  const src = join(SOURCE, `${slideNum}.png`);
  if (!existsSync(src)) return false;
  const dir = join(OUT, slug);
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, `${role}.png`);
  copyFileSync(src, dest);
  console.log(`✓ ${slug}/${role}.png ← ${slideNum}.png`);
  return true;
}

console.log(`Source: ${SOURCE}`);
console.log(`Output: ${OUT}\n`);

let copied = 0;
let missing = 0;

for (const [slug, roles] of Object.entries(DECK)) {
  for (const [role, slideNum] of Object.entries(roles)) {
    if (copySlide(slug, role, slideNum)) copied += 1;
    else {
      missing += 1;
      console.log(`– skip ${slug}/${role}.png (no ${slideNum}.png)`);
    }
  }
}

console.log(`\nDone: ${copied} copied, ${missing} missing.`);
