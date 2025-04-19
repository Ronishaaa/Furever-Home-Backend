import { PrismaClient } from "@prisma/client";

export const getAllDonations = async (
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
    db.donation.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    }),
    db.donation.count(),
  ]);

  return { data, meta: { skip, limit, total } };
};
