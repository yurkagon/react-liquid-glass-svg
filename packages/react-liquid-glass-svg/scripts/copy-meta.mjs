/**
 * Pre-build step: sync root-level README.md, LICENSE, CHANGELOG.md and the
 * docs/ folder into the published package.
 *
 * Source of truth lives in the repo root. This script keeps the published
 * package self-contained so npmjs.com renders the same README + screenshots
 * as GitHub.
 *
 * Run automatically before every `pnpm build` and `npm publish` of the
 * library. Do NOT edit the copied files inside the package — they are
 * overwritten.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');

const FILES = ['README.md', 'LICENSE', 'CHANGELOG.md'];
const DIRS = ['docs'];

let copied = 0;

for (const file of FILES) {
  const src = path.join(repoRoot, file);
  const dest = path.join(packageRoot, file);
  if (!fs.existsSync(src)) {
    console.warn(`⚠  ${file} not found at repo root — skipping`);
    continue;
  }
  fs.copyFileSync(src, dest);
  copied++;
}

for (const dir of DIRS) {
  const src = path.join(repoRoot, dir);
  const dest = path.join(packageRoot, dir);
  if (!fs.existsSync(src)) {
    console.warn(`⚠  ${dir}/ not found at repo root — skipping`);
    continue;
  }
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  copied++;
}

console.log(`✓ Synced ${copied} meta items into the package.`);
