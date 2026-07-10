import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const symbolSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="g" x1="42" y1="34" x2="214" y2="222" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#34d399"/>
      <stop offset="0.55" stop-color="#10b981"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="64" fill="#0f172a"/>
  <rect x="18" y="18" width="220" height="220" rx="54" fill="url(#g)"/>
  <path fill="#fff" fill-rule="evenodd" d="M86.8 82.4c-19.1 0-34.6 15.5-34.6 34.6 0 38.3 53.3 62.2 73.6 77.4a8 8 0 0 0 9.6 0c20.3-15.2 73.6-39.1 73.6-77.4 0-19.1-15.5-34.6-34.6-34.6-16 0-27.2 9.2-35.4 20.2-3.6 4.8-10.8 4.8-14.4 0-8.2-11-19.4-20.2-37.8-20.2Zm73.7 35.9a11.8 11.8 0 0 1 16.7 16.7l-46.5 46.5a11.8 11.8 0 0 1-16.7 0l-26.7-26.7a11.8 11.8 0 1 1 16.7-16.7l18.4 18.4 38.1-38.2Z"/>
</svg>`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0v42" fill="none" stroke="#10b981" stroke-opacity=".12" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="82%" cy="22%" r="50%">
      <stop offset="0" stop-color="#bbf7d0"/>
      <stop offset=".55" stop-color="#ecfdf5" stop-opacity=".55"/>
      <stop offset="1" stop-color="#f8fafc" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0f172a" flood-opacity=".18"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="#f8fafc"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(86 74)">
    <rect width="92" height="92" rx="26" fill="#0f172a"/>
    <rect x="8" y="8" width="76" height="76" rx="22" fill="#10b981"/>
    <path fill="#fff" d="M33 36c-8 0-14 6-14 14 0 16 22 26 31 32a3 3 0 0 0 4 0c9-6 31-16 31-32 0-8-6-14-14-14-7 0-12 4-15 8-2 2-5 2-7 0-3-4-8-8-16-8Zm31 16a5 5 0 0 1 7 7L52 78a5 5 0 0 1-7 0L34 67a5 5 0 0 1 7-7l7 7 16-15Z"/>
    <text x="116" y="60" fill="#0f172a" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800">enDesign</text>
  </g>
  <text x="86" y="260" fill="#0f172a" font-family="Arial, sans-serif" font-size="70" font-weight="900" letter-spacing="-3">いい仕事が、</text>
  <text x="86" y="342" fill="#10b981" font-family="Arial, sans-serif" font-size="78" font-weight="900" letter-spacing="-4">ちゃんと届くように。</text>
  <g transform="translate(90 392)">
    <rect width="164" height="52" rx="26" fill="#fff" stroke="#d1fae5"/>
    <rect x="184" width="164" height="52" rx="26" fill="#fff" stroke="#d1fae5"/>
    <rect x="368" width="164" height="52" rx="26" fill="#fff" stroke="#d1fae5"/>
    <text x="34" y="35" fill="#059669" font-family="Arial, sans-serif" font-size="24" font-weight="900">無料診断</text>
    <text x="222" y="35" fill="#059669" font-family="Arial, sans-serif" font-size="24" font-weight="900">5万円〜</text>
    <text x="406" y="35" fill="#059669" font-family="Arial, sans-serif" font-size="24" font-weight="900">月額なし</text>
  </g>
  <g transform="translate(778 150)" filter="url(#shadow)">
    <rect width="330" height="342" rx="34" fill="#fff" stroke="#e2e8f0"/>
    <rect width="330" height="74" rx="34" fill="#f8fafc"/>
    <text x="28" y="45" fill="#10b981" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="5">FREE CHECK</text>
    <rect x="28" y="104" width="274" height="112" rx="24" fill="#0f172a"/>
    <text x="54" y="150" fill="#94a3b8" font-family="Arial, sans-serif" font-size="17" font-weight="700">診断サマリー</text>
    <text x="54" y="184" fill="#fff" font-family="Arial, sans-serif" font-size="28" font-weight="900">導線を先に整理</text>
    <rect x="54" y="235" width="222" height="14" rx="7" fill="#e2e8f0"/>
    <rect x="54" y="235" width="164" height="14" rx="7" fill="#10b981"/>
    <g fill="#fff" stroke="#e2e8f0">
      <rect x="28" y="274" width="274" height="46" rx="18"/>
      <rect x="28" y="334" width="274" height="46" rx="18"/>
    </g>
    <circle cx="58" cy="297" r="11" fill="#ecfdf5"/>
    <circle cx="58" cy="357" r="11" fill="#ecfdf5"/>
    <path d="m52 297 5 5 10-13M52 357l5 5 10-13" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

function pngIco(pngBuffer) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(0, 6);
  header.writeUInt8(0, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(pngBuffer.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, pngBuffer]);
}

const iconPng = await sharp(Buffer.from(symbolSvg)).resize(1024, 1024).png().toBuffer();
const appleIconPng = await sharp(Buffer.from(symbolSvg)).resize(180, 180).png().toBuffer();
const faviconPng = await sharp(Buffer.from(symbolSvg)).resize(256, 256).png().toBuffer();
const ogPng = await sharp(Buffer.from(ogSvg)).png().toBuffer();

await writeFile("src/app/icon.png", iconPng);
await writeFile("src/app/apple-icon.png", appleIconPng);
await writeFile("src/app/favicon.ico", pngIco(faviconPng));
await writeFile("src/app/opengraph-image.png", ogPng);
await writeFile("src/app/twitter-image.png", ogPng);
