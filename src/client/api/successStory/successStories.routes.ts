import Router from "@koa/router";
import * as Controller from "./successStories.controller";

const router = new Router();

router.get("/:id", Controller.getSuccessStoryById);

router.get("/", Controller.getSuccessStories);

export default router;
