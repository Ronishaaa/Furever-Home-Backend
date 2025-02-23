import Router from "@koa/router";
import { adminRouter } from "./admin";
import { petRouter } from "./pet";
import { rescueStoriesRouter } from "./rescueStory";
import { successStoriesRouter } from "./successStory";

const router = new Router({ prefix: "/api" });

router.use("/pets", petRouter.routes(), petRouter.allowedMethods());

router.use(adminRouter.routes(), adminRouter.allowedMethods());

router.use(
  "/rescue",
  rescueStoriesRouter.routes(),
  rescueStoriesRouter.allowedMethods()
);

router.use(
  "/success",
  successStoriesRouter.routes(),
  successStoriesRouter.allowedMethods()
);

export default router;
