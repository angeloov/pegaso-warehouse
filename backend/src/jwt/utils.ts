import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../mongoose/User";
import type { UserType } from "../mongoose/User";

export function createAccessToken(user: any) {
  const payload = { id: user.id };
  const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);

  return { token: "Bearer " + signedToken };
}

export async function getUserInfo(accessToken: string) {
  const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as jwt.Secret) as UserType;
  return await User.findById(id);
}
