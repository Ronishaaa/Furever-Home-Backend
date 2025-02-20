import Router from "@koa/router";
import { adminRouter } from "./admin";
import { petRouter } from "./pet";

const router = new Router({ prefix: "/api" });

router.use("/pets", petRouter.routes(), petRouter.allowedMethods());

router.use(adminRouter.routes(), adminRouter.allowedMethods());

export default router;
