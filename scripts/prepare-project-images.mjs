import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const files = {
  pancho: "pancho", kiwe: "kiwe", kim: "kim", "flavia-pascal": "flavia pascal",
  pascal: "pascal", flavia: "flavia", loza: "loza", laboragro: "laboragro",
  "estacion-alemania": "estacion alemania", acrodata: "data acroyoga",
};
const source = process.argv[2];
if (!source) throw new Error("Pass the directory containing the project images.");
await mkdir("public/projects/orbit", { recursive: true });
for (const [slug, filename] of Object.entries(files)) {
  const input = path.join(source, filename);
  const metadata = await sharp(input).metadata();
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 85 }).toFile(`public/projects/orbit/${slug}.webp`);
  await sharp(input).rotate().resize({ width: 480, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`public/projects/orbit/${slug}-thumb.webp`);
  console.log(`${slug}: ${metadata.width} × ${metadata.height}`);
}
