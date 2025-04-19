import { ApplicationStatus, PrismaClient } from "@prisma/client";
import { sendMail } from "@utils";
import { ApplicationInput } from "./application.schema";

interface DecisionEmailParams {
  to: string;
  petName: string;
  status: ApplicationStatus;
}

export const sendApplicationDecisionEmail = async ({
  to,
  petName,
  status,
}: DecisionEmailParams) => {
  const isApproved = status === "Approved";

  const subject = `Your Pet Adoption Application has been ${
    isApproved ? "Approved" : "Rejected"
  }`;

  const html = isApproved
    ? `
      <p>Congratulations! 🎉</p>
      <p>Your application to adopt <strong>${petName}</strong> has been <strong>approved</strong>.</p>
      <p>Our team will contact you soon for the next steps.</p>
    `
    : `
      <p>We're sorry to inform you.</p>
      <p>Your application to adopt <strong>${petName}</strong> has been <strong>rejected</strong>.</p>
      <p>Please feel free to explore other pets and try again.</p>
    `;

  await sendMail({
    to,
    subject,
    html,
  });
};

export const getAllApplicationsService = async (
  db: PrismaClient,
  {
    skip,
    limit,
  }: {
    skip: number;
    limit: number;
  }
) => {
  const [data, total] = await db.$transaction([
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            images: true,
            breed: true,
          },
        },
      },
    }),
    db.application.count(),
  ]);

  return { data, meta: { skip, limit, total } };
};

export const getApplicationByIdService = async (
  db: PrismaClient,
  id: number
) => {
  return await db.application.findUniqueOrThrow({
    where: { id },
    include: {
      pet: {
        select: {
          id: true,
          name: true,
          images: true,
          breed: true,
          age: true,
          gender: true,
        },
      },
    },
  });
};

export const deleteApplicationService = async (
  db: PrismaClient,
  id: number
) => {
  await db.application.delete({
    where: { id },
  });

  return { message: "Successfully deleted application" };
};

export const updateApplicationService = async (
  db: PrismaClient,
  id: number,
  applicationData: ApplicationInput
) => {
  const updatedApplication = await db.application.update({
    where: { id },
    data: applicationData,
    include: {
      user: true,
      pet: {
        select: {
          id: true,
          name: true,
          images: true,
          breed: true,
          age: true,
          gender: true,
        },
      },
    },
  });

  if (applicationData.applicationStatus === "Approved") {
    await db.pet.update({
      where: { id: updatedApplication.pet.id },
      data: { adoptionStatus: "Adopted" },
    });
  } else if (applicationData.applicationStatus === "Rejected") {
    await db.pet.update({
      where: { id: updatedApplication.pet.id },
      data: { adoptionStatus: "Available" },
    });
  }

  await sendApplicationDecisionEmail({
    to: updatedApplication.user.email,
    petName: updatedApplication.pet.name,
    status: applicationData.applicationStatus,
  });

  return updatedApplication;
};
