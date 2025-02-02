import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbgzu9tau",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, allowed_formats: ["jpg", "jpe", "jpeg", "png", "webp"] },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    // ? Convert buffer into readable stream before uploading
    Readable.from(buffer).pipe(uploadStream);
  });
};

export default uploadImage;
