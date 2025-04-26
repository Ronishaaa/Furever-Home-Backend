import { spawn } from "child_process";
import path from "path";

interface DogInput {
  max_height: number;
  grooming_frequency_value: number;
  shedding_value: number;
  energy_level_value: number;
  trainability_value: number;
}

export const getBreedRecommendation = (input: DogInput): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "./../breed_model/breed_model.py");

    const args = [
      input.max_height.toString(),
      input.grooming_frequency_value.toString(),
      input.shedding_value.toString(),
      input.energy_level_value.toString(),
      input.trainability_value.toString(),
    ];

    const process = spawn(
      "C:Users\ronisAppDataLocalProgramsPythonPython313python.exe",
      [scriptPath, ...args]
    );

    let result = "";
    let error = "";

    process.stdout.on("data", (data) => {
      result += data.toString();
    });

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0 || error) {
        reject(`Python script error: ${error}`);
      } else {
        try {
          const json = JSON.parse(result);
          resolve(json.recommended_breeds);
        } catch (e) {
          reject("Failed to parse Python output: " + e);
        }
      }
    });
  });
};
