import { PrismaClient } from "@prisma/client";
import { DonationInput } from "./donation.schema";

export const createDonation = async (
  db: PrismaClient,
  data: DonationInput & { pidx: string; status: string }
) => {
  return await db.donation.create({
    data: {
      amount: data.amount,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      pidx: data.pidx,
      status: data.status,
      userId: data.userId ?? null,
    },
  });
};

export const updateDonation = async (
  db: PrismaClient,
  pidx: string,
  data: { status: string; transaction_id?: string; completed_at?: Date }
) => {
  return await db.donation.update({
    where: { pidx },
    data: {
      status: data.status,
      transactionId: data.transaction_id,
      completedAt: data.completed_at,
    },
  });
};
