/**
 * Optimizes SVG icons that contain embedded raster images.
 * Extracts the PNG, resizes to display size (128px), converts to WebP,
 * and re-embeds - preserving the exact same visual design.
 * Run: node scripts/optimize-svg-icons.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const iconsDir = path.join(__dirname, "../public/icons");
const icons = ["instagramIco.svg", "gmailIco.svg", "whatsappIco.svg"];
const targetSize = 512; // High resolution for crisp display
const webpQuality = 98; // Near-lossless quality

async function optimizeIcon(filename) {
  const filepath = path.join(iconsDir, filename);
  if (!fs.existsSync(filepath)) return;

  const content = fs.readFileSync(filepath, "utf8");
  const match = content.match(/xlink:href="(data:image\/png;base64,[^"]+)"/);
  if (!match) {
    console.log(`${filename}: No embedded PNG found, skipping`);
    return;
  }

  const base64Data = match[1].replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const originalSize = buffer.length;

  const webpBuffer = await sharp(buffer)
    .resize({ width: targetSize, fit: "inside" }) // Preserves aspect ratio (original 1536×1024 = 3:2)
    .webp({ quality: webpQuality })
    .toBuffer();

  const webpBase64 = webpBuffer.toString("base64");
  const newContent = content.replace(
    /xlink:href="data:image\/png;base64,[^"]+"/,
    `xlink:href="data:image/webp;base64,${webpBase64}"`
  );
  // Keep original width/height in SVG - the pattern transform matrix depends on them

  fs.writeFileSync(filepath, newContent);
  const newSize = fs.statSync(filepath).size;
  const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
  console.log(`${filename}: ${(originalSize / 1024).toFixed(0)} KB → ${(newSize / 1024).toFixed(2)} KB (${saved}% smaller)`);
}

async function main() {
  for (const icon of icons) {
    await optimizeIcon(icon);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
