import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const STATIC_DIR = 'static';
const WIDTHS = [640, 960, 1280];
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
const JPEG_OPTIONS = { quality: 88, mozjpeg: true };

let total = 0;
let skipped = 0;
let generated = 0;

function* walkImages(dir) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory() && !entry.name.startsWith('.')) {
			yield* walkImages(full);
		} else if (entry.isFile() && IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
			// Skip generated variants (e.g., img-480w.jpeg)
			if (/-\d+w\.jpe?g$/i.test(entry.name)) continue;
			yield full;
		}
	}
}

async function processImage(filePath) {
	total++;

	const ext = path.extname(filePath);
	const baseName = filePath.slice(0, -ext.length);

	// Get original dimensions
	let metadata;
	try {
		metadata = await sharp(filePath).metadata();
	} catch {
		console.warn(`  ⚠  Cannot read: ${filePath}`);
		return;
	}

	const nativeW = metadata.width;
	if (!nativeW) {
		console.warn(`  ⚠  No width metadata: ${filePath}`);
		return;
	}

	for (const w of WIDTHS) {
		// Don't upscale — clamp to native width if image is smaller than the target
		const resizeW = Math.min(w, nativeW);

		const jpegDest = `${baseName}-${w}w.jpeg`;

		// Skip if already generated and source hasn't changed
		const srcMtime = fs.statSync(filePath).mtimeMs;

		if (fs.existsSync(jpegDest) && fs.statSync(jpegDest).mtimeMs > srcMtime) {
			skipped++;
			continue;
		}

		try {
			const pipeline = sharp(filePath).resize(resizeW).withMetadata(false);

			// Generate JPEG
			await pipeline.clone().jpeg(JPEG_OPTIONS).toFile(jpegDest);

			generated++;
		} catch (err) {
			console.warn(`  ⚠  Failed ${filePath} @ ${w}w: ${err.message}`);
		}
	}
}

console.log('Optimizing images in static/ ...\n');

for (const filePath of walkImages(STATIC_DIR)) {
	const rel = path.relative(STATIC_DIR, filePath);
	process.stdout.write(`  ${rel.padEnd(60)}\r`);
	await processImage(filePath);
}

console.log(`\nDone. ${total} images → ${generated} variants generated, ${skipped} skipped (up to date).\n`);
