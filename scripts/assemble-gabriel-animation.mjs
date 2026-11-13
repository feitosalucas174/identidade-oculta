import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(projectRoot, 'assets-source', 'gabriel');
const outputDir = path.join(projectRoot, 'public', 'assets');
const outputPath = path.join(outputDir, 'gabriel_elias_editor.webp');

const EXPECTED_FRAME_COUNT = 8;
const EXPECTED_DIRECT_FRAME_DURATION_MS = 220;

// A versão WebP enviada diretamente para public/assets tem prioridade.
// O Vite copia public/assets para docs/assets durante npm run build.
// Assim, a animação nova não é sobrescrita pela versão antiga em Base64.
function validateDirectWebP(webp) {
  if (
    webp.length < 30 ||
    webp.toString('ascii', 0, 4) !== 'RIFF' ||
    webp.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    throw new Error('Gabriel direct asset is not a valid WebP file.');
  }

  const riffLength = webp.readUInt32LE(4) + 8;
  if (riffLength !== webp.length) {
    throw new Error(
      `Gabriel WebP RIFF size mismatch: header says ${riffLength} bytes, file has ${webp.length}.`
    );
  }

  const frames = [];
  let offset = 12;

  while (offset + 8 <= webp.length) {
    const chunkType = webp.toString('ascii', offset, offset + 4);
    const chunkSize = webp.readUInt32LE(offset + 4);
    const payloadOffset = offset + 8;
    const chunkEnd = payloadOffset + chunkSize;

    if (chunkEnd > webp.length) {
      throw new Error(`Invalid WebP chunk "${chunkType}": chunk exceeds file size.`);
    }

    if (chunkType === 'ANMF') {
      if (chunkSize < 16) {
        throw new Error('Invalid WebP animation frame: ANMF header is incomplete.');
      }

      // ANMF frame duration is a 24-bit little-endian integer at payload byte 12.
      const durationMs = webp.readUIntLE(payloadOffset + 12, 3);
      frames.push({ durationMs });
    }

    offset = chunkEnd + (chunkSize % 2);
  }

  if (offset !== webp.length) {
    throw new Error('Gabriel WebP contains an incomplete trailing chunk.');
  }

  if (frames.length !== EXPECTED_FRAME_COUNT) {
    throw new Error(
      `Gabriel animation must contain ${EXPECTED_FRAME_COUNT} frames; found ${frames.length}.`
    );
  }

  const invalidDurations = frames
    .map((frame, index) => ({ frame: index + 1, durationMs: frame.durationMs }))
    .filter((frame) => frame.durationMs !== EXPECTED_DIRECT_FRAME_DURATION_MS);

  if (invalidDurations.length > 0) {
    const details = invalidDurations
      .map(({ frame, durationMs }) => `#${frame}=${durationMs}ms`)
      .join(', ');
    throw new Error(
      `Gabriel direct animation must match the crew timing (${EXPECTED_DIRECT_FRAME_DURATION_MS}ms/frame). Found: ${details}.`
    );
  }
}

function assembleLegacyBase64Asset() {
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
    throw new Error(
      `Legacy Gabriel WebP base64 size mismatch: expected 58880 chars, got ${encoded.length}.`
    );
  }

  const webp = Buffer.from(encoded, 'base64');
  if (
    webp.length !== 44158 ||
    webp.toString('ascii', 0, 4) !== 'RIFF' ||
    webp.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    throw new Error('Legacy Gabriel animation is not a valid expected WebP asset.');
  }

  const frameCount = webp.toString('ascii').split('ANMF').length - 1;
  if (frameCount !== EXPECTED_FRAME_COUNT) {
    throw new Error(
      `Legacy Gabriel animation must contain ${EXPECTED_FRAME_COUNT} frames; found ${frameCount}.`
    );
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, webp);
  console.warn(
    'Using the legacy Base64 Gabriel animation. Add the corrected WebP to public/assets/gabriel_elias_editor.webp to replace it.'
  );
  console.log(
    `Prepared legacy Gabriel animation (${frameCount} frames, ${webp.length} bytes).`
  );
}

mkdirSync(outputDir, { recursive: true });

if (existsSync(outputPath)) {
  const directWebP = readFileSync(outputPath);
  validateDirectWebP(directWebP);
  console.log(
    `Using direct Gabriel WebP asset (${EXPECTED_FRAME_COUNT} frames, ${directWebP.length} bytes): public/assets/gabriel_elias_editor.webp`
  );
} else {
  assembleLegacyBase64Asset();
}
