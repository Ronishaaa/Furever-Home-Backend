-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applicationStatus" "ApplicationStatus" NOT NULL DEFAULT 'Pending';
