import { Context } from "koa";
import { AdminLoginInput } from "./admin.schema";
import { loginAdmin } from "./admin.service";

export const login = async (ctx: Context) => {
  const data = await loginAdmin(<AdminLoginInput>ctx.request.body);

  ctx.status = 200;
  ctx.body = { data };
};
