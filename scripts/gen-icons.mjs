import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgBuffer = readFileSync(join(root, "public", "icon-color.svg"));

const sizes = [
  { name: "apple-touch-icon.png", size: 180, bg: true },
  { name: "icon-192.png", size: 192, bg: false },
  { name: "icon-32.png", size: 32, bg: false },
];

for (const { name, size, bg } of sizes) {
  let pipeline = sharp(svgBuffer, { density: Math.ceil((size / 240) * 96 * 2.5) }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });

  if (bg) {
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
  }

  await pipeline.png().toFile(join(root, "public", name));
  console.log(`✓ ${name} (${size}×${size})`);
}
