import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = 'public/assets/aistudio';
const files = fs.readdirSync(dir);

console.log('Optimizing images in', dir, '...');

files.forEach(file => {
  if (!file.endsWith('.jpg') && !file.endsWith('.jpeg')) return;
  const filePath = path.join(dir, file);
  const statBefore = fs.statSync(filePath);
  const sizeBeforeMB = (statBefore.size / 1024 / 1024).toFixed(2);

  let targetWidth = 600;
  if (file.startsWith('AG_FC')) targetWidth = 800;

  try {
    execSync(`convert "${filePath}" -resize ${targetWidth}x -strip -quality 82 "${filePath}"`);
    const statAfter = fs.statSync(filePath);
    const sizeAfterKB = (statAfter.size / 1024).toFixed(1);
    console.log(`✓ ${file}: ${sizeBeforeMB}MB -> ${sizeAfterKB}KB`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
});

console.log('Done optimizing images!');
