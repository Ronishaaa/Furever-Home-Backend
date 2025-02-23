import Router from "@koa/router";
import { upload, validate } from "@middlewares";
import * as Controller from "./rescueStories.controller";
import { RescueStorySchema } from "./rescueStories.schema";

const router = new Router();

router.post(
  "/upload",
  upload.array("images"),
  Controller.storeImagesForRescueStories
);

router.post("/", validate(RescueStorySchema), Controller.addRescueStory);

router.delete("/:id", Controller.deleteRescueStory);

router.patch("/:id", validate(RescueStorySchema), Controller.updateRescueStory);

router.get("/:id", Controller.getRescueStoryById);

router.get("/", Controller.getRescueStories);

export default router;
