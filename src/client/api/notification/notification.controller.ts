import { Context } from "koa";
import * as NotificationService from "./notification.service";

export const getNotification = async (ctx: Context) => {
  const { userId } = ctx.params;
  const notification = await NotificationService.getNotification(
    ctx.db,
    Number(userId)
  );

  ctx.status = 200;
  ctx.body = { data: notification };
};
