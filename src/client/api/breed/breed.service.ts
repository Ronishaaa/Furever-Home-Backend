import { spawn } from "child_process";
import path from "path";
import { DogInput } from "./breed.schema";

export const getBreedRecommendation = (input: DogInput): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      __dirname,
      "../../../_globals/breed_model/breed_model.py"
    );

    const args = [
      input.max_height,
      input.grooming_frequency_value,
      input.shedding_value,
      input.energy_level_value,
      input.trainability_value,
    ].map(String);

    const py = spawn(
      "C:/Users/ronis/AppData/Local/Programs/Python/Python313/python.exe",
      [scriptPath, ...args]
    );

    let result = "";
    let error = "";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0 || error) {
        reject(`Python error: ${error}`);
      } else {
        try {
          const parsed = JSON.parse(result);
          resolve(parsed.recommended_breeds);
        } catch (e) {
          reject("Failed to parse Python output: " + e);
        }
      }
    });
  });
};
