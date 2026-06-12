import type { ImageTransform } from './ImageTransform.js';

/** Inlined from floyd-steinberg (MIT) — avoids CJS-only default export in browser ESM. */
function floydSteinbergDither(image: ImageData): ImageData {
  const imageData = image.data;
  const imageDataLength = imageData.length;
  const w = image.width;
  const lumR: number[] = [];
  const lumG: number[] = [];
  const lumB: number[] = [];

  for (let i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.11;
  }

  for (let i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(
      lumR[imageData[i]] + lumG[imageData[i + 1]] + lumB[imageData[i + 2]],
    );
  }

  for (let currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
    const newPixel = imageData[currentPixel] < 150 ? 0 : 255;
    const err = Math.floor((imageData[currentPixel] - newPixel) / 23);
    imageData[currentPixel] = newPixel;
    imageData[currentPixel + 4] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w] += err * 5;
    imageData[currentPixel + 4 * w + 4] += err * 1;
    imageData[currentPixel + 1] = imageData[currentPixel + 2] = imageData[currentPixel];
  }

  return image;
}

export const floydSteinberg: ImageTransform = image => floydSteinbergDither(image as ImageData);
