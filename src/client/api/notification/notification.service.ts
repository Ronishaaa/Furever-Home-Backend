import { PrismaClient } from "@prisma/client";

export const getNotification = async (db: PrismaClient, userId: number) => {
  return await db.notification.findMany({
    where: { userId },
    select: {
      id: true,
      message: true,
      createdAt: true,
      pet: {
        select: {
          id: true,
          name: true,
          images: true,
          breed: true,
        },
      },
      wishlist: {
        select: {
          id: true,
          breed: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};
