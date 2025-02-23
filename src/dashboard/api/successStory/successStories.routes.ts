import Router from "@koa/router";
import { upload, validate } from "@middlewares";
import * as Controller from "./successStories.controller";
import { SuccessStorySchema } from "./successStories.schema";

const router = new Router();

router.post(
  "/upload",
  upload.array("images"),
  Controller.storeImagesForSuccessStories
);

router.post("/", validate(SuccessStorySchema), Controller.addSuccessStory);

router.delete("/:id", Controller.deleteSuccessStory);

router.patch(
  "/:id",
  validate(SuccessStorySchema),
  Controller.updateSuccessStory
);

router.get("/:id", Controller.getSuccessStoryById);

router.get("/", Controller.getSuccessStories);

export default router;
