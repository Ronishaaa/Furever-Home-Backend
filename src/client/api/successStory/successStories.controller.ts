import { Context } from "koa";
import * as Service from "./successStories.service";

export const getSuccessStories = async (ctx: Context) => {
  const data = await Service.getSuccessStories(ctx.db);

  ctx.status = 200;
  ctx.body = { data };
};

export const getSuccessStoryById = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.getSuccessStoryById(ctx.db, Number(id));

  ctx.status = data ? 200 : 404;
  ctx.body = { data };
};
