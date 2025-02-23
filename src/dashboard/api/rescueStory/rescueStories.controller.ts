import { AppError } from "@exceptions";
import cloudinary from "_globals/utils/cloudinary";
import { optimizeImage } from "_globals/utils/sharpOptimize";
import { Context } from "koa";
import { RescueStoryInput } from "./rescueStories.schema";
import * as Service from "./rescueStories.service";

export const storeImagesForRescueStories = async (ctx: Context) => {
  if (!ctx.request.files || !Array.isArray(ctx.request.files)) {
    throw new AppError("No files uploaded", 400, true);
  }

  // Process images uploaded for the success stories
  const uploadResults = await Promise.all(
    ctx.request.files.map(async (file) => {
      const optimizedFile = await optimizeImage(file.buffer, file.mimetype);
      return await cloudinary(optimizedFile, "rescue-stories");
    })
  );

  const response = uploadResults.map(({ secure_url, created_at }) => ({
    uri: secure_url,
    createdAt: created_at,
  }));

  ctx.status = 201;
  ctx.body = { images: response };
};

export const addRescueStory = async (ctx: Context) => {
  const data = await Service.addRescueStory(
    ctx.db,
    <RescueStoryInput>ctx.request.body
  );

  ctx.status = 201;
  ctx.body = { data };
};

export const getRescueStories = async (ctx: Context) => {
  const data = await Service.getRescueStories(ctx.db);

  ctx.status = 200;
  ctx.body = { data };
};

export const getRescueStoryById = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.getRescueStoryById(ctx.db, id);

  ctx.status = data ? 200 : 404;
  ctx.body = { data };
};

export const updateRescueStory = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.updateRescueStory(
    ctx.db,
    id,
    <RescueStoryInput>ctx.request.body
  );

  ctx.status = 200;
  ctx.body = { data };
};

export const deleteRescueStory = async (ctx: Context) => {
  const { id } = ctx.params;
  await Service.deleteRescueStory(ctx.db, id);

  ctx.status = 204;
};
