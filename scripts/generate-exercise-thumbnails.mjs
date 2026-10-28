import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const catalogUrl =
  'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/api/en/exercises.json';
const outputRoot = path.resolve('public', 'exercises', 'thumbnails');
const manifestPath = path.join(outputRoot, 'manifest.json');
const concurrency = 8;
const args = new Set(process.argv.slice(2));
const force = args.has('--force');
const limitArg = process.argv.find(argument => argument.startsWith('--limit='));
const limit = limitArg ? Number.parseInt(limitArg.slice('--limit='.length), 10) : undefined;

const response = await fetch(catalogUrl);
if (!response.ok) {
  throw new Error(`Exercise catalog request failed with HTTP ${response.status}`);
}

const payload = await response.json();
if (!Array.isArray(payload.exercises)) {
  throw new Error('Exercise catalog did not contain an exercises array');
}

const records = limit ? payload.exercises.slice(0, limit) : payload.exercises;
await mkdir(outputRoot, { recursive: true });

const results = [];
let nextIndex = 0;

const worker = async () => {
  while (nextIndex < records.length) {
    const record = records[nextIndex++];
    if (!record || typeof record.id !== 'string' || typeof record.gifUrl !== 'string') {
      results.push({ status: 'failed', reason: 'Invalid catalog record' });
      continue;
    }

    const relativePath = `${record.id}.webp`;
    const outputPath = path.join(outputRoot, relativePath);
    await mkdir(path.dirname(outputPath), { recursive: true });

    try {
      if (!force) {
        await access(outputPath);
        results.push({ id: record.id, name: record.name, path: `/exercises/thumbnails/${relativePath}`, status: 'cached' });
        continue;
      }

      const gifResponse = await fetch(record.gifUrl);
      if (!gifResponse.ok) {
        throw new Error(`GIF request failed with HTTP ${gifResponse.status}`);
      }

      const gifBuffer = Buffer.from(await gifResponse.arrayBuffer());
      await sharp(gifBuffer, { page: 0 })
        .resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      results.push({ id: record.id, name: record.name, path: `/exercises/thumbnails/${relativePath}`, status: 'generated' });
    } catch (error) {
      results.push({
        id: record.id,
        name: record.name,
        source: record.gifUrl,
        status: 'failed',
        reason: error instanceof Error ? error.message : String(error)
      });
    }

    if (results.length % 50 === 0 || results.length === records.length) {
      console.log(`Processed ${results.length}/${records.length}`);
    }
  }
};

await Promise.all(Array.from({ length: Math.min(concurrency, records.length) }, worker));

const failed = results.filter(result => result.status === 'failed');
const manifest = {
  generatedAt: new Date().toISOString(),
  source: catalogUrl,
  count: records.length,
  generated: results.filter(result => result.status === 'generated' || result.status === 'cached').length,
  failed: failed.length,
  thumbnails: results.filter(result => result.status !== 'failed'),
  failures: failed
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`Wrote ${manifest.generated} thumbnails to ${outputRoot}`);
if (failed.length > 0) {
  console.error(`Failed to generate ${failed.length} thumbnails. See ${manifestPath}`);
  process.exitCode = 1;
}
