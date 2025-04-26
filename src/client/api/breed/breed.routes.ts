import Router from "@koa/router";
import { recommendBreed } from "./breed.controller";

const router = new Router();

router.post("/recommend", recommendBreed);

export default router;
