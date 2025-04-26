import Router from "@koa/router";
import * as Controller from "./pets.controller";

const router = new Router();

router.get("/:id", Controller.getPetById);

router.get("/", Controller.getAllPets);

router.get("/similar/:id", Controller.getSimilarPets);

export default router;
