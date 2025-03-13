import { Context } from "koa";
import { WishlistInput } from "./wishlist.schema";
import * as WishlistService from "./wishlist.service";

export const addOrUpdateWishlist = async (ctx: Context) => {
  const data = <WishlistInput>ctx.request.body;
  const wishlist = await WishlistService.addOrUpdateWishlist(ctx.db, data);

  ctx.status = 201;
  ctx.body = { data: wishlist };
};

export const getWishlist = async (ctx: Context) => {
  const { userId } = ctx.params;
  const wishlist = await WishlistService.getWishlist(ctx.db, Number(userId));

  ctx.status = 200;
  ctx.body = { data: wishlist };
};

export const deleteWishlist = async (ctx: Context) => {
  const { userId } = ctx.params;
  await WishlistService.deleteWishlist(ctx.db, Number(userId));

  ctx.status = 200;
  ctx.body = { message: "Wishlist deleted successfully" };
};
