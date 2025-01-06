import type { Context, Next } from "koa";
import { AnyZodObject, ZodEffects } from "zod";

export const validate =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  (ctx: Context, next: Next) => {
    ctx.request.body = schema.parse(ctx.request.body);
    return next();
  };

export const validateAsync =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (ctx: Context, next: Next) => {
    ctx.request.body = await schema.parseAsync(ctx.request.body);
    return next();
  };

export const validateQueryString =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  (ctx: Context, next: Next) => {
    ctx.request.query = schema.parse(ctx.request.query);
    return next();
  };
