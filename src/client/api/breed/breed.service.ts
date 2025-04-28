import { PrismaClient } from "@prisma/client";
import { spawn } from "child_process";
import path from "path";
import { DogInput } from "./breed.schema";

export const getBreedRecommendation = async (
  db: PrismaClient,
  input: DogInput
): Promise<any> => {
  return new Promise((resolve) => {
    const scriptPath = path.join(
      __dirname,
      "../../../_globals/breed_model/breed_model.py"
    );

    const args = [
      input.grooming.toString(),
      input.shedding.toString(),
      input.energy.toString(),
      input.trainability.toString(),
      input.lifestyle,
      input.home_type,
      input.experience_level,
    ];

    const py = spawn("python", [scriptPath, ...args]);

    let result = "";
    let error = "";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", async (code) => {
      if (code !== 0 || error) {
        return resolve({
          message: `Python error: ${error || "Unknown error"}`,
        });
      }

      try {
        const parsed = JSON.parse(result.trim());
        const breeds: string[] = parsed.recommended_breeds.map(
          (breed: string) => breed.trim()
        );

        if (!breeds || breeds.length === 0) {
          return resolve({ message: "No breeds recommended by Python model." });
        }

        console.log("Recommended Breeds:", breeds);

        const pets = await db.pet.findMany({
          where: {
            breed: {
              in: breeds,
              mode: "insensitive",
            },
          },
          take: 3,
        });

        if (pets.length > 0) {
          resolve(pets);
        } else {
          resolve({ message: "No pets found for the recommended breeds." });
        }
      } catch (e) {
        resolve({ message: "Failed to parse Python output." });
      }
    });
  });
};
