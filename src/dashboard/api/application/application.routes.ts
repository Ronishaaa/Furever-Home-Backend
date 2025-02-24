import Router from "@koa/router";
import * as Controller from "./application.controller";

const router = new Router();

router.get("/", Controller.getAllApplication);

router.get("/:id", Controller.getApplicationById);

router.delete("/:id", Controller.deleteApplication);

export default router;
