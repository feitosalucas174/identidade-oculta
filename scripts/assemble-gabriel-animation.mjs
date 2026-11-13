import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(projectRoot, 'assets-source', 'gabriel');
const outputDir = path.join(projectRoot, 'public', 'assets');
const outputPath = path.join(outputDir, 'gabriel_elias_editor.webp');

const parts = [
  'part-01.b64',
  'part-02.b64',
  'part-03.b64',
  'part-04.b64',
  'gap-01.b64',
  'gap-02.b64',
  'part-05a.b64',
  'part-05b1.b64',
  'part-05b2.b64',
  'tail-01.b64',
  'tail-02.b64',
  'tail-03.b64',
  'tail-04.b64',
  'tail-05.b64',
  'tail-06.b64',
  'tail-07.b64',
];

const encoded = parts
  .map((file) => readFileSync(path.join(sourceDir, file), 'utf8').trim())
  .join('');

if (encoded.length !== 58880) {
  throw new Error(`Gabriel WebP base64 size mismatch: expected 58880 chars, got ${encoded.length}`);
}

const webp = Buffer.from(encoded, 'base64');
if (webp.length !== 44158 || webp.toString('ascii', 0, 4) !== 'RIFF' || webp.toString('ascii', 8, 12) !== 'WEBP') {
  throw new Error('Gabriel animation is not a valid expected WebP asset.');
}

const frameCount = webp.toString('ascii').split('ANMF').length - 1;
if (frameCount !== 8) {
  throw new Error(`Gabriel animation must contain 8 frames; found ${frameCount}.`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, webp);
console.log(`Prepared Gabriel Elias animation (${frameCount} frames, ${webp.length} bytes): public/assets/gabriel_elias_editor.webp`);
