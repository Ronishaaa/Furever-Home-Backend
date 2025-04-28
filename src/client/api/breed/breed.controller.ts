import { Context } from "koa";
import { DogInputSchema } from "./breed.schema";
import { getBreedRecommendation } from "./breed.service";

export const recommendBreed = async (ctx: Context) => {
  try {
    const parsed = DogInputSchema.parse(ctx.request.body);
    const recommendations = await getBreedRecommendation(ctx.db, parsed);
    ctx.body = { recommendedBreeds: recommendations };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: "Invalid input or internal error", details: err };
  }
};
