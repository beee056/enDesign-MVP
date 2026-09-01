import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const symbolSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="58" fill="#123c37"/>
  <circle cx="128" cy="128" r="84" fill="#edb43f"/>
  <circle cx="128" cy="128" r="72" fill="none" stroke="#fffaf0" stroke-width="3" stroke-dasharray="6 8"/>
  <text x="128" y="148" text-anchor="middle" fill="#123c37" font-family="Georgia, serif" font-size="82" font-style="italic" font-weight="700">en</text>
</svg>`;

const ogBaseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fffaf0"/>
  <path d="M0 525C210 468 355 570 595 505S1000 420 1200 493V630H0Z" fill="#cfe2d8"/>
  <path d="M0 96H652" stroke="#123c37" stroke-opacity=".16"/>
  <path d="M0 124H606" stroke="#123c37" stroke-opacity=".08"/>
  <rect x="74" y="62" width="58" height="58" rx="17" fill="#123c37"/>
  <circle cx="103" cy="91" r="20" fill="#edb43f"/>
  <text x="103" y="100" text-anchor="middle" fill="#123c37" font-family="Georgia, serif" font-size="22" font-style="italic" font-weight="700">en</text>
  <text x="150" y="99" fill="#123c37" font-family="Noto Sans JP, sans-serif" font-size="30" font-weight="800">enDesign</text>
  <text x="75" y="212" fill="#e96b3b" font-family="Noto Sans JP, sans-serif" font-size="18" font-weight="900" letter-spacing="3">RESEARCH FIRST WEB PRODUCTION</text>
  <text x="72" y="302" fill="#123c37" font-family="Noto Sans JP, sans-serif" font-size="64" font-weight="800">いい仕事を、</text>
  <text x="72" y="388" fill="#123c37" font-family="Noto Sans JP, sans-serif" font-size="70" font-weight="800">見つけてから作る。</text>
  <path d="M80 416C240 438 410 401 600 421" fill="none" stroke="#e96b3b" stroke-width="8" stroke-linecap="round"/>
  <text x="76" y="490" fill="#496c66" font-family="Noto Sans JP, sans-serif" font-size="22" font-weight="600">口コミ・SNS・検索・競合の調査から始めるLP制作</text>
</svg>`;

function pngIco(pngBuffer) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(pngBuffer.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, pngBuffer]);
}

const iconPng = await sharp(Buffer.from(symbolSvg)).resize(1024, 1024).png().toBuffer();
const appleIconPng = await sharp(Buffer.from(symbolSvg)).resize(180, 180).png().toBuffer();
const faviconPng = await sharp(Buffer.from(symbolSvg)).resize(256, 256).png().toBuffer();
const illustration = await readFile("public/brand/endesign-process-illustration.webp");
const illustrationLayer = await sharp(illustration).resize({
  width: 580,
  height: 490,
  fit: "contain",
  background: { r: 0, g: 0, b: 0, alpha: 0 },
}).png().toBuffer();
const ogPng = await sharp(Buffer.from(ogBaseSvg)).composite([{ input: illustrationLayer, left: 650, top: 118 }]).png().toBuffer();

await writeFile("src/app/icon.png", iconPng);
await writeFile("src/app/apple-icon.png", appleIconPng);
await writeFile("src/app/favicon.ico", pngIco(faviconPng));
await writeFile("src/app/opengraph-image.png", ogPng);
await writeFile("src/app/twitter-image.png", ogPng);
