import Router from "@koa/router";
import * as Controller from "./dashboard.controller";

const router = new Router();

router.get("/", Controller.getDashboardStats);

export default router;
