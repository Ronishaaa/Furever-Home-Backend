import { ApplicationStatus } from "@prisma/client";
import { Context } from "koa";
import { ApplicationInput } from "./application.schema";
import * as Service from "./application.service";

export const getAllApplication = async (ctx: Context) => {
  const { skip = 0, limit, applicationStatus } = ctx.query;

  const { data, meta } = await Service.getAllApplicationsService(ctx.db, {
    skip: Number(skip) || 0,
    limit: Number(limit) || 10,
    applicationStatus:
      (applicationStatus?.toString() as ApplicationStatus) ?? undefined,
  });

  ctx.status = 201;
  ctx.body = { data, meta };
};

export const getApplicationById = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await Service.getApplicationByIdService(ctx.db, Number(id));

  if (!data) {
    ctx.throw(404, "Application not found");
  }

  ctx.status = 200;
  ctx.body = { data };
};

export const deleteApplication = async (ctx: Context) => {
  const { id } = ctx.params;
  const response = await Service.deleteApplicationService(ctx.db, id);
  ctx.status = 200;
  ctx.body = response;
};

export const updateApplication = async (ctx: Context) => {
  const { id } = ctx.params;

  const updatedApplication = await Service.updateApplicationService(
    ctx.db,
    Number(id),
    <ApplicationInput>ctx.request.body
  );

  ctx.status = 200;
  ctx.body = { application: updatedApplication };
};
