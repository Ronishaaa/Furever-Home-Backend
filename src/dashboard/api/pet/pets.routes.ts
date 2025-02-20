import Router from "@koa/router";
import { upload, validate } from "@middlewares";
import {
  addPet,
  deletePet,
  getAllPets,
  getPetById,
  storeImages,
  updatePet,
} from "./pets.controller";
import { PetSchema } from "./pets.schema";

const router = new Router();

router.post("/upload", upload.array("images"), storeImages);

router.post("/", validate(PetSchema), addPet);

router.delete("/:id", deletePet);

router.patch("/:id", validate(PetSchema), updatePet);

router.get("/:id", getPetById);

router.get("/", getAllPets);

export default router;
