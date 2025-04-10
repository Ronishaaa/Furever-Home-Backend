import Router from "@koa/router";
import { applicationRouter } from "./applications";
import { donationRouter } from "./donation";
import { petRouter } from "./pet";
import { rescueStoriesRouter } from "./rescueStory";
import { successStoriesRouter } from "./successStory";
import { userRouter } from "./users";
import { wishlistRouter } from "./wishlist";

const router = new Router({ prefix: "/api" });

router.use(userRouter.routes(), userRouter.allowedMethods());

router.use("/pets", petRouter.routes(), petRouter.allowedMethods());

router.use(
  "/application",
  applicationRouter.routes(),
  applicationRouter.allowedMethods()
);

router.use(
  "/donation",
  donationRouter.routes(),
  donationRouter.allowedMethods()
);

router.use(
  "/wishlist",
  wishlistRouter.routes(),
  wishlistRouter.allowedMethods()
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
