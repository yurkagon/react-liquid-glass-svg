import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');
const prerenderDir = path.join(distDir, '_prerender');
const indexHtmlPath = path.join(distDir, 'index.html');
const renderEntryPath = path.join(prerenderDir, 'entry-server.js');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('✗ dist/index.html not found — run build:client first.');
  process.exit(1);
}
if (!fs.existsSync(renderEntryPath)) {
  console.error(
    '✗ dist/_prerender/entry-server.js not found — run build:prerender first.'
  );
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

const { render } = await import(pathToFileURL(renderEntryPath).href);
const appHtml = render();

const html = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

fs.writeFileSync(indexHtmlPath, html, 'utf-8');
fs.rmSync(prerenderDir, { recursive: true, force: true });

console.log('✓ Prerendered dist/index.html');
