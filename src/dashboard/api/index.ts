import Router from "@koa/router";
import { adminRouter } from "./admin";
import { applicationRouter } from "./application";
import { dashboardRouter } from "./dashboard";
import { petRouter } from "./pet";
import { rescueStoriesRouter } from "./rescueStory";
import { successStoriesRouter } from "./successStory";

const router = new Router({ prefix: "/api" });

router.use(adminRouter.routes(), adminRouter.allowedMethods());

router.use("/pets", petRouter.routes(), petRouter.allowedMethods());

router.use(
  "/dashboard",
  dashboardRouter.routes(),
  dashboardRouter.allowedMethods()
);

router.use(
  "/application",
  applicationRouter.routes(),
  applicationRouter.allowedMethods()
);

router.use(
  "/rescue-stories",
  rescueStoriesRouter.routes(),
  rescueStoriesRouter.allowedMethods()
);

router.use(
  "/success-stories",
  successStoriesRouter.routes(),
  successStoriesRouter.allowedMethods()
);

export default router;
