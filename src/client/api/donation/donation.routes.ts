import Router from "@koa/router";
import { validate } from "@middlewares";
import * as Controller from "./donation.controller";
import { DonationSchema, DonationVerificationSchema } from "./donation.schema";

const router = new Router();

router.post("/", validate(DonationSchema), Controller.initiateDonation);
router.post(
  "/verify",
  validate(DonationVerificationSchema),
  Controller.verifyDonation
);

export default router;
