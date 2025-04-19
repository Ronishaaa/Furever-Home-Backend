import { AppError } from "@exceptions";
import cloudinary from "_globals/utils/cloudinary";
import { optimizeImage } from "_globals/utils/sharpOptimize";
import { Context } from "koa";
import { SuccessStoryInput } from "./successStories.schema";
import * as Service from "./successStories.service";

export const storeImagesForSuccessStories = async (ctx: Context) => {
  if (!ctx.request.files || !Array.isArray(ctx.request.files)) {
    throw new AppError("No files uploaded", 400, true);
  }

  const uploadResults = await Promise.all(
    ctx.request.files.map(async (file) => {
      const optimizedFile = await optimizeImage(file.buffer, file.mimetype);
      return await cloudinary(optimizedFile, "success-stories");
    })
  );

  const response = uploadResults.map(({ secure_url, created_at }) => ({
    uri: secure_url,
    createdAt: created_at,
  }));

  ctx.status = 201;
  ctx.body = { images: response };
};

export const addSuccessStory = async (ctx: Context) => {
  const data = await Service.addSuccessStory(
    ctx.db,
    <SuccessStoryInput>ctx.request.body
  );

  ctx.status = 201;
  ctx.body = { data };
};

export const getSuccessStories = async (ctx: Context) => {
  const { skip = 0, limit } = ctx.query;

  const { data, meta } = await Service.getSuccessStories(ctx.db, {
    skip: Number(skip) || 0,
    limit: Number(limit) || 10,
  });

  ctx.status = 200;
  ctx.body = { data, meta };
};

export const getSuccessStoryById = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.getSuccessStoryById(ctx.db, Number(id));

  ctx.status = data ? 200 : 404;
  ctx.body = { data };
};

export const updateSuccessStory = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.updateSuccessStory(
    ctx.db,
    Number(id),
    <SuccessStoryInput>ctx.request.body
  );

  ctx.status = 200;
  ctx.body = { data };
};

export const deleteSuccessStory = async (ctx: Context) => {
  const { id } = ctx.params;
  await Service.deleteSuccessStory(ctx.db, id);

  ctx.status = 204;
};
