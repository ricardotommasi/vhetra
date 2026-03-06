/**
 * Optimizes bg.png: resizes to max 2560px width and converts to WebP
 * Run: node scripts/optimize-bg.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputPath = path.join(__dirname, "../public/img/bg.png");
const outputPath = path.join(__dirname, "../public/img/bg.webp");
const maxWidth = 2560;
const quality = 80;

async function optimize() {
  if (!fs.existsSync(inputPath)) {
    console.error("bg.png not found at", inputPath);
    process.exit(1);
  }

  const inputStats = fs.statSync(inputPath);
  console.log(`Input: ${(inputStats.size / 1024 / 1024).toFixed(2)} MB`);

  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);
  console.log(`Output: ${(outputStats.size / 1024).toFixed(2)} KB`);
  console.log(`Saved: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}%`);
  console.log("Created public/img/bg.webp - update layout to use it, then delete bg.png");
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
