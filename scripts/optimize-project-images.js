/**
 * Optimizes project SVG images that contain embedded raster images.
 * Extracts PNG/JPEG, resizes to display size, converts to WebP,
 * and re-embeds - dramatically reducing load time.
 * Handles multiple embedded images per SVG.
 * Run: node scripts/optimize-project-images.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const projectsDir = path.join(__dirname, "../public/projects");

// Thumbnails (1): display at ~160px, quality/size balanced
// Full images (2): display at ~384px modal, higher quality for detail
const THUMBNAIL_MAX_WIDTH = 320;
const THUMBNAIL_QUALITY = 85;
const FULL_IMAGE_MAX_WIDTH = 1024; // 2.5x modal size for retina + zoom
const FULL_IMAGE_QUALITY = 95; // Near-lossless for modal detail

function getOptions(filename) {
  const isFull = filename.endsWith("2.svg");
  return {
    width: isFull ? FULL_IMAGE_MAX_WIDTH : THUMBNAIL_MAX_WIDTH,
    quality: isFull ? FULL_IMAGE_QUALITY : THUMBNAIL_QUALITY,
  };
}

async function optimizeProjectImage(filename) {
  const filepath = path.join(projectsDir, filename);
  if (!fs.existsSync(filepath)) return;

  let content = fs.readFileSync(filepath, "utf8");
  const originalFileSize = fs.statSync(filepath).size;
  const { width: targetWidth, quality: webpQuality } = getOptions(filename);

  // Match PNG or JPEG embedded images (skip already-optimized WebP)
  const regex = /xlink:href="(data:image\/(png|jpeg);base64,([^"]+))"/g;
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) {
    console.log(`${filename}: No embedded PNG/JPEG found, skipping`);
    return;
  }

  for (const match of matches) {
    const fullMatch = match[1];
    const base64Data = match[3];
    const buffer = Buffer.from(base64Data, "base64");
    const webpBuffer = await sharp(buffer)
      .resize({ width: targetWidth, fit: "inside" })
      .webp({ quality: webpQuality })
      .toBuffer();
    const webpBase64 = webpBuffer.toString("base64");
    content = content.replace(
      `xlink:href="${fullMatch}"`,
      `xlink:href="data:image/webp;base64,${webpBase64}"`
    );
  }

  fs.writeFileSync(filepath, content);
  const newFileSize = fs.statSync(filepath).size;
  const saved = ((1 - newFileSize / originalFileSize) * 100).toFixed(1);
  const origMB = (originalFileSize / 1024 / 1024).toFixed(2);
  const newKB = (newFileSize / 1024).toFixed(1);
  console.log(`${filename}: ${origMB} MB → ${newKB} KB (${matches.length} images, ${saved}% smaller)`);
}

async function main() {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".svg"));
  console.log(`Optimizing ${files.length} project images...\n`);
  for (const file of files) {
    await optimizeProjectImage(file);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
