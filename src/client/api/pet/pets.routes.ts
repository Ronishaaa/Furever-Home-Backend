import Router from "@koa/router";
import * as Controller from "./pets.controller";

const router = new Router();

router.get("/:id", Controller.getPetById);

router.get("/", Controller.getAllPets);

export default router;
