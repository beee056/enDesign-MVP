import sharp from "sharp";
import { resolve } from "node:path";

const [inputArg, outputArg] = process.argv.slice(2);
if (!inputArg || !outputArg) {
  throw new Error("Usage: node scripts/extract-checker-alpha.mjs INPUT OUTPUT");
}

const input = resolve(inputArg);
const output = resolve(outputArg);
const { data, info } = await sharp(input)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const total = width * height;
const rgba = Buffer.alloc(total * 4);

for (let index = 0; index < total; index += 1) {
  const sourceOffset = index * channels;
  const targetOffset = index * 4;
  const r = data[sourceOffset];
  const g = data[sourceOffset + 1];
  const b = data[sourceOffset + 2];
  const low = Math.min(r, g, b);
  const high = Math.max(r, g, b);
  const isChecker = low >= 225 && high - low <= 5;
  rgba[targetOffset] = r;
  rgba[targetOffset + 1] = g;
  rgba[targetOffset + 2] = b;
  rgba[targetOffset + 3] = isChecker ? 0 : 255;
}

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(output);
