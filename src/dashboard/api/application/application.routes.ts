import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./application.controller";
import { ApplicationSchema } from "./application.schema";

const router = new Router();

router.get("/", Controller.getAllApplication);

router.get("/:id", Controller.getApplicationById);

router.delete("/:id", Controller.deleteApplication);

router.patch("/:id", validate(ApplicationSchema), Controller.updateApplication);

export default router;
