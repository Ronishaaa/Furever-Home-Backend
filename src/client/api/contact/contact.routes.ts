import Router from "@koa/router";
import * as Controller from "./contact.controller";

const router = new Router();

router.post("/", Controller.contactController);

export default router;
