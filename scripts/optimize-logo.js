/**
 * Extracts embedded PNG from logoImgVhetra.svg and creates optimized WebP
 * Run: node scripts/optimize-logo.js
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const inputPath = path.join(__dirname, "../public/img/logoImgVhetra.svg");
const outputPath = path.join(__dirname, "../public/img/logoImgVhetra.webp");

async function optimize() {
  if (!fs.existsSync(inputPath)) {
    console.error("logoImgVhetra.svg not found");
    process.exit(1);
  }

  const svgContent = fs.readFileSync(inputPath, "utf8");
  const match = svgContent.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
  if (!match) {
    console.error("No embedded PNG found in SVG");
    process.exit(1);
  }

  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, "base64");
  const inputSize = buffer.length;
  console.log(`Extracted PNG: ${(inputSize / 1024).toFixed(2)} KB`);

  await sharp(buffer)
    .resize(512, 512, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);
  console.log(`Output: ${(outputStats.size / 1024).toFixed(2)} KB`);
  console.log("Created public/img/logoImgVhetra.webp");
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
