#!/usr/bin/env node
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const target = path.join(root, "src/assets/about-hero-team.jpg");
const backup = `${target}.bak`;
const temp = `${target}.opt.jpg`;

if (!existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

const before = statSync(target).size;
if (!existsSync(backup)) {
  execSync(`cp "${target}" "${backup}"`);
}

execSync(`sips -Z 1920 "${target}" --out "${temp}"`);
execSync(`sips -s format jpeg -s formatOptions 80 "${temp}" --out "${target}"`);
execSync(`rm -f "${temp}"`);

const after = statSync(target).size;
const dims = execSync(`sips -g pixelWidth -g pixelHeight "${target}"`, { encoding: "utf8" });
console.log(dims.trim());
console.log(
  `about-hero-team.jpg: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`,
);
