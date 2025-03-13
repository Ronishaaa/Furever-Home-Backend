import { Context } from "koa";
import * as Service from "./rescueStories.service";

export const getRescueStories = async (ctx: Context) => {
  const data = await Service.getRescueStories(ctx.db);

  ctx.status = 200;
  ctx.body = { data };
};

export const getRescueStoryById = async (ctx: Context) => {
  const { id } = ctx.params;

  const data = await Service.getRescueStoryById(ctx.db, Number(id));

  ctx.status = data ? 200 : 404;
  ctx.body = { data };
};
