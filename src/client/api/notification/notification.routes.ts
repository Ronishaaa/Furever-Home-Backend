import Router from "@koa/router";
import * as Controller from "./notification.controller";

const router = new Router();

router.get("/:userId", Controller.getNotification);

export default router;
