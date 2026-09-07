import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const source = fileURLToPath(new URL("../assets/services/", import.meta.url));
const output = fileURLToPath(new URL("../public/services/", import.meta.url));
for (const name of await readdir(source)) {
  if (!name.endsWith(".webp")) continue;
  const input = path.join(source, name);
  const destination = path.join(output, name.replace(".webp", "-640.webp"));
  await sharp(input).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(destination);
  console.log(`${name}: ${(await stat(input)).size} → ${(await stat(destination)).size} bytes`);
}
