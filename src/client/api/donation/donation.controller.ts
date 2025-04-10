import axios from "axios";
import { Context } from "koa";
import { DonationInput, DonationVerificationInput } from "./donation.schema";
import * as Service from "./donation.service";

const KHALTI_CONFIG = {
  baseUrl: "https://dev.khalti.com/api/v2",
  secretKey: process.env.KHALTI_SANDBOX_SECRET_KEY || "test_secret_key",
};

export const initiateDonation = async (ctx: Context) => {
  const donationData = <DonationInput>ctx.request.body;

  const payload = {
    return_url: `http://localhost:5174/verification`,
    website_url: process.env.FRONTEND_URL || "http://localhost:5174",
    amount: donationData.amount * 100,
    purchase_order_id: `DONATION-GEN-${Date.now()}`,
    purchase_order_name: "Animal Welfare Donation",
    customer_info: {
      name: donationData.name,
      email: donationData.email,
      phone: donationData.phone,
    },
    product_details: [
      {
        identity: "general-donation",
        name: "Animal Welfare Donation",
        total_price: donationData.amount * 100,
        quantity: 1,
        unit_price: donationData.amount * 100,
      },
    ],
  };

  const response = await axios.post(
    `${KHALTI_CONFIG.baseUrl}/epayment/initiate/`,
    payload,
    {
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  await Service.createDonation(ctx.db, {
    ...donationData,
    pidx: response.data.pidx,
    status: "initiated",
  });

  ctx.status = 201;
  ctx.body = { paymentUrl: response.data.payment_url };
};
export const verifyDonation = async (ctx: Context) => {
  const { pidx } = <DonationVerificationInput>ctx.request.body;

  const response = await axios.post(
    `${KHALTI_CONFIG.baseUrl}/epayment/lookup/`,
    { pidx },
    {
      headers: {
        Authorization: `Key ${KHALTI_CONFIG.secretKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const khaltiStatus = response.data.status;

  await Service.updateDonation(ctx.db, pidx, {
    status: khaltiStatus.toLowerCase(),
    transaction_id: response.data.transaction_id,
    completed_at: khaltiStatus === "Completed" ? new Date() : undefined,
  });

  ctx.status = 200;
  ctx.body = {
    status: khaltiStatus === "Completed" ? "success" : "failed",
    data: response.data,
  };
};
