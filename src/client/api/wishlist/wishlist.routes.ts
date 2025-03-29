import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./wishlist.controller";
import { WishlistSchema } from "./wishlist.schema";

const router = new Router();

router.post("/", validate(WishlistSchema), Controller.addOrUpdateWishlist);

router.delete("/:id", Controller.deleteWishlist);

router.get("/:userId", Controller.getWishlist);

export default router;
