import { Context } from "koa";
import { LoginInput, RegisterInput, UpdateSocketInput } from "./users.schema";
import {
  loginUser,
  registerUser,
  resendVerificationEmail,
  updateSocket,
  verifyOtp,
  verifyToken,
} from "./users.service";

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export const register = async (ctx: Context) => {
  const data = await registerUser(<RegisterInput>ctx.request.body);

  ctx.status = 201;
  ctx.body = { data };
};

export const login = async (ctx: Context) => {
  const { token, user } = await loginUser(<LoginInput>ctx.request.body);

  ctx.status = 201;
  ctx.body = { message: "user login", token, user };
};

export const updateSocketController = async (ctx: Context) => {
  const { userId } = ctx.params;
  const data = await updateSocket(
    Number(userId),
    <UpdateSocketInput>ctx.request.body
  );

  ctx.status = 200;
  ctx.body = { data };
};

export const verifyOtpController = async (ctx: Context) => {
  const { email, otp } = ctx.request.body as VerifyOtpRequest;

  if (!email || !otp) {
    ctx.throw(400, "Email and OTP are required");
  }

  const result = await verifyOtp(email, otp);
  ctx.status = 200;
  ctx.body = result;
};

export const verify = async (ctx: Context) => {
  const token = ctx.headers.authorization?.split(" ")[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "No token provided" };
    return;
  }

  const { valid, user } = await verifyToken(token);

  if (valid) {
    ctx.status = 200;
    ctx.body = { valid: true, user };
  } else {
    ctx.status = 401;
    ctx.body = { valid: false, message: "Invalid token" };
  }
};

export const resendVerification = async (ctx: Context) => {
  const { email } = ctx.request.body as { email: string };

  if (!email) {
    ctx.throw(400, "Email is required");
  }

  const result = await resendVerificationEmail(email);
  ctx.status = 200;
  ctx.body = result;
};
