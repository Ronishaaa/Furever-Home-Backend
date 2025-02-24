import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./users.controller";
import { LoginSchema, RegisterSchema } from "./users.schema";

const router = new Router();

router.post("/sign-up", validate(RegisterSchema), Controller.register);
router.post("/login", validate(LoginSchema), Controller.login);
router.post("/verify-otp", Controller.verifyOtpController);

export default router;
