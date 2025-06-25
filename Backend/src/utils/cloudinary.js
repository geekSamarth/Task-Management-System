import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiResponse } from "./api-response";
import { ApiError } from "./api-error";

// cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function for uploading on cloudinary

export const uploadOnCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    const response = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localpath);
    return response;
  } catch (error) {
    console.error("Error in upload on cloudinary!");
    fs.unlinkSync(localpath);
    throw new ApiError(500, "Failed to upload the image on cloudinary");
  }
};
