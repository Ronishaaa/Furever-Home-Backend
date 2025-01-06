import { Context } from "koa";
import { LoginInput, RegisterInput } from "./users.schema";
import { loginUser, registerUser, verifyOtp } from "./users.service";

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export const register = async (ctx: Context) => {
  const data = await registerUser(<RegisterInput>ctx.request.body);

  ctx.status = 201;
  ctx.body = { message: "User register" };
};

export const login = async (ctx: Context) => {
  const { token, user } = await loginUser(<LoginInput>ctx.request.body);

  ctx.status = 201;
  ctx.body = { message: "user login", token, user };
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
