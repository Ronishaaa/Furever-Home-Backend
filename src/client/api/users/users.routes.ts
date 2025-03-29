import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./users.controller";
import {
  LoginSchema,
  RegisterSchema,
  UpdateSocketSchema,
} from "./users.schema";

const router = new Router();

router.post("/sign-up", validate(RegisterSchema), Controller.register);
router.post("/login", validate(LoginSchema), Controller.login);
router.post("/verify-otp", Controller.verifyOtpController);
router.get("/verify", Controller.verify);
router.patch(
  "/socket/:userId",
  validate(UpdateSocketSchema),
  Controller.updateSocketController
);

export default router;
