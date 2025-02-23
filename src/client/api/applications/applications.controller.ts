import { Context } from "koa";
import { ApplicationInput } from "./applications.schema";
import * as Service from "./applications.service";

export const application = async (ctx: Context) => {
  const data = await Service.addApplication(
    ctx.db,
    <ApplicationInput>ctx.request.body
  );

  ctx.status = 201;
  ctx.body = { data };
};
