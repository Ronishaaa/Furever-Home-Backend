import { Context } from "koa";
import { AdminLoginInput } from "./admin.schema";
import { loginAdmin } from "./admin.service";

export const login = async (ctx: Context) => {
  const { email, password } = <AdminLoginInput>ctx.request.body;

  const { token, admin } = await loginAdmin({ email, password });

  ctx.status = 200;
  ctx.body = { message: "Admin logged in successfully", token, admin };
};
