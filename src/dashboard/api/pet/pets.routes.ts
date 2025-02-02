import Router from "@koa/router";
import { upload } from "@middlewares";
import {
  addPet,
  deletePet,
  getAllPets,
  getPetById,
  storeImages,
  updatePet,
} from "./pets.controller";

const router = new Router();

router.post("/upload", upload.array("images"), storeImages);

router.post("/add-pet", addPet);

router.delete("/pets/:id", deletePet);

router.patch("/pets/:id", updatePet);

router.get("/pets/:id", getPetById);

router.get("/pets", getAllPets);

export default router;
