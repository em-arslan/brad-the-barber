import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "assets", "images");
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;

async function optimizeHeroImages() {
  const files = await readdir(IMAGES_DIR);
  const heroes = files.filter((f) => /^hero-\d+\.png$/i.test(f));

  for (const file of heroes) {
    const input = join(IMAGES_DIR, file);
    const output = join(IMAGES_DIR, file.replace(/\.png$/i, ".webp"));

    await sharp(input)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: WEBP_QUALITY })
      .toFile(output);

    console.log(`Optimized: ${file} -> ${file.replace(/\.png$/i, ".webp")}`);
  }

  // Optimize brad portrait
  const bradInput = join(IMAGES_DIR, "brad-barber.jpeg");
  const bradOutput = join(IMAGES_DIR, "brad-barber.webp");
  await sharp(bradInput)
    .resize(960, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 80 })
    .toFile(bradOutput);
  console.log("Optimized: brad-barber.jpeg -> brad-barber.webp");
}

async function optimizeGalleryImages() {
  for (let i = 1; i <= 6; i++) {
    const jpeg = join(IMAGES_DIR, `Brad_The_Barber Gallery Image ${i}.jpeg`);
    const webp = join(IMAGES_DIR, `gallery-${i}.webp`);
    try {
      await sharp(jpeg)
        .resize(900, null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: 80 })
        .toFile(webp);
      console.log(`Optimized gallery: gallery-${i}.webp`);
    } catch {
      // fallback: gallery-N.webp from png if present
      const png = join(IMAGES_DIR, `gallery-${i}.png`);
      try {
        await sharp(png)
          .resize(900, null, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: 80 })
          .toFile(webp);
        console.log(`Optimized gallery: gallery-${i}.webp (from png)`);
      } catch {
        console.warn(`Skipped gallery ${i} — source not found`);
      }
    }
  }
}

async function optimizeAll() {
  await optimizeHeroImages();
  await optimizeGalleryImages();
}

optimizeAll().catch(console.error);
