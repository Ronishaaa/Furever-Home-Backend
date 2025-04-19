import { Context } from "koa";
import * as Service from "./donation.service";

export const getAllDonations = async (ctx: Context) => {
  const { skip = 0, limit } = ctx.query;

  const { data, meta } = await Service.getAllDonations(ctx.db, {
    skip: Number(skip) || 0,
    limit: Number(limit) || 10,
  });

  ctx.status = 200;
  ctx.body = { data, meta };
};
