import { Prisma, PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/_globals/utils";

const prisma = new PrismaClient();

const data: Prisma.AdminCreateInput = {
  email: "admin@gmail.com",
  password: "admin@1234",
};

const seedAdmin = async () => {
  const passwordHash = await hashPassword(data.password);

  const admin = await prisma.admin.upsert({
    where: { email: data.email },
    update: {},
    create: { ...data, password: passwordHash },
    select: { id: true },
  });

  return admin;
};

async function main() {
  console.log("Start seeding ...");

  const admin = await seedAdmin();
  console.log(`Created dashboard admin with id: ${admin.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
