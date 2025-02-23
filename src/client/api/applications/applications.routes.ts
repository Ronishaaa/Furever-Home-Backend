import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./applications.controller";
import { ApplicationSchema } from "./applications.schema";

const router = new Router();

router.post(
  "/application",
  validate(ApplicationSchema),
  Controller.application
);

export default router;
