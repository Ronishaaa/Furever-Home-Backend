import sharp from "sharp";

export const optimizeImage = async (imageBuffer: Buffer, mimeType: string) => {
  let optimizedImage: Buffer;

  switch (mimeType) {
    case "image/jpeg":
    case "image/jpg":
      optimizedImage = await sharp(imageBuffer)
        .jpeg({ quality: 80 })
        .toBuffer();
      break;
    case "image/png":
      optimizedImage = await sharp(imageBuffer).png({ quality: 80 }).toBuffer();
      break;
    case "image/webp":
      optimizedImage = await sharp(imageBuffer)
        .webp({ quality: 80 })
        .toBuffer();
      break;
    default:
      optimizedImage = await sharp(imageBuffer).png({ quality: 80 }).toBuffer();
      break;
  }

  return optimizedImage;
};
