import { Context } from "koa";
import * as Service from "./dashboard.service";

export const getDashboardStats = async (ctx: Context) => {
  const stats = await Service.getDashboardStatsService(ctx.db);

  ctx.status = 200;
  ctx.body = { data: stats };
};
