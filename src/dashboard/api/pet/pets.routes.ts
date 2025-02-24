import Router from "@koa/router";
import { upload, validate } from "@middlewares";
import * as Controller from "./pets.controller";
import { PetSchema } from "./pets.schema";

const router = new Router();

router.post("/upload", upload.array("images"), Controller.storeImages);

router.post("/", validate(PetSchema), Controller.addPet);

router.delete("/:id", Controller.deletePet);

router.patch("/:id", validate(PetSchema), Controller.updatePet);

router.get("/:id", Controller.getPetById);

router.get("/", Controller.getAllPets);

export default router;
