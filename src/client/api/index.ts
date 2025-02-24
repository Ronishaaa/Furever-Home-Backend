import Router from "@koa/router";
import { applicationRouter } from "./applications";
import { userRouter } from "./users";

const router = new Router({ prefix: "/api" });

router.use(userRouter.routes(), userRouter.allowedMethods());
router.use(
  "/application",
  applicationRouter.routes(),
  applicationRouter.allowedMethods()
);

export default router;
