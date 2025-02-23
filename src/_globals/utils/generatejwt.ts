import jwt from "jsonwebtoken";

export const generateJwt = (userId: number, expiresIn: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });
  return { accessToken: `Bearer ${token}`, expiresIn };
};
