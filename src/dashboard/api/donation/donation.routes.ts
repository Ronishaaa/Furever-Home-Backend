import Router from "@koa/router";
import * as Controller from "./donation.controller";

const router = new Router();

router.get("/", Controller.getAllDonations);

export default router;
