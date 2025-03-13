import Router from "@koa/router";
import * as Controller from "./rescueStories.controller";

const router = new Router();

router.get("/:id", Controller.getRescueStoryById);

router.get("/", Controller.getRescueStories);

export default router;
