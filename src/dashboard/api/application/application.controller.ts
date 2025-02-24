import { Context } from "koa";
import * as Service from "./application.service";

export const getAllApplication = async (ctx: Context) => {
  const { data, meta } = await Service.getAllApplicationsService(ctx.db);

  ctx.status = 201;
  ctx.body = { data, meta };
};

export const getApplicationById = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.getApplicationByIdService(ctx.db, Number(id));

  if (!data) {
    ctx.throw(404, "Application not found");
  }

  ctx.status = 200;
  ctx.body = { data };
};

export const deleteApplication = async (ctx: Context) => {
  const { id } = ctx.params;
  const response = await Service.deleteApplicationService(ctx.db, id);
  ctx.status = 200;
  ctx.body = response;
};
