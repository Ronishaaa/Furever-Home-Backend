import Router from "@koa/router";
import { validate } from "@middlewares";
import * as controller from "./users.controller";
import { LoginSchema, RegisterSchema } from "./users.schema";

const router = new Router();

router.post("/sign-up", validate(RegisterSchema), controller.register);
router.post("/login", validate(LoginSchema), controller.login);
router.post("/verify-otp", controller.verifyOtpController);

export default router;
