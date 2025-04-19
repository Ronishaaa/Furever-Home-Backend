import { PrismaClient } from "@prisma/client";

interface DashboardStats {
  totalDogs: number;
  pendingApplications: number;
  approvedThisMonth: number;
  dogStatus: {
    available: number;
    pendingAdoption: number;
    adopted: number;
  };
  breedDistribution: {
    breed: string;
    count: number;
  }[];
  recentApplications: {
    id: number;
    name: string;
    dog: string;
    status: string;
  }[];
  recentDonations: {
    id: number;
    amount: string;
    donor: string;
  }[];
}

export const getDashboardStatsService = async (
  db: PrismaClient
): Promise<DashboardStats> => {
  const [totalDogs, pendingApplications, approvedThisMonth] = await Promise.all(
    [
      db.pet.count(),
      db.application.count({
        where: { applicationStatus: "Pending" },
      }),
      db.application.count({
        where: {
          applicationStatus: "Approved",
        },
      }),
    ]
  );

  const dogStatus = await db.pet.groupBy({
    by: ["adoptionStatus"],
    _count: {
      adoptionStatus: true,
    },
  });

  const breedDistribution = await db.pet.groupBy({
    by: ["breed"],
    _count: {
      breed: true,
    },
    orderBy: {
      _count: {
        breed: "desc",
      },
    },
    take: 5,
  });

  const recentApplications = await db.application.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      pet: {
        select: {
          name: true,
          breed: true,
        },
      },
    },
  });

  const recentDonations = await db.donation.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    totalDogs,
    pendingApplications,
    approvedThisMonth,
    dogStatus: {
      available:
        dogStatus.find((s) => s.adoptionStatus === "Available")?._count
          .adoptionStatus || 0,
      pendingAdoption:
        dogStatus.find((s) => s.adoptionStatus === "Pending")?._count
          .adoptionStatus || 0,
      adopted:
        dogStatus.find((s) => s.adoptionStatus === "Adopted")?._count
          .adoptionStatus || 0,
    },
    breedDistribution: breedDistribution.map((b) => ({
      breed: b.breed,
      count: b._count.breed,
    })),
    recentApplications: recentApplications.map((app) => ({
      id: app.id,
      name: app.user.username,
      dog: `${app.pet.name} (${app.pet.breed})`,
      status: app.applicationStatus,
    })),
    recentDonations: recentDonations.map((donation) => ({
      id: donation.id,
      amount: `₹${donation.amount.toFixed(2)}`,
      donor: donation.user ? donation.user.username : "Anonymous",
    })),
  };
};
