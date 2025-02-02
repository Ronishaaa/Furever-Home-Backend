import Router from "@koa/router";
import { validate } from "@middlewares";
import { login } from "./admin.controller";
import { AdminLoginSchema } from "./admin.schema";

const router = new Router();

router.post("/admin/login", validate(AdminLoginSchema), login);

export default router;
