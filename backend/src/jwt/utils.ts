import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../mongoose/User";

function validatePassword(password: string, hash: string, salt: string) {
  let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === hashVerify;
}

function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function createAccessToken(user: any) {
  const expiresIn = 60 * 5; // 5 minutes

  const payload = {
    id: user.id,
    // exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string);

  return {
    token: "Bearer " + signedToken,
    // expires: expiresIn,
  };
}

async function createOrRetrieveRefreshToken(user: any, next: any) {
  const expiresIn = 60 * 60 * 24 * 7; // 7 days

  const payload = {
    id: user.id,
    expiresIn: Math.floor(Date.now() / 1000) + expiresIn,
  };

  let refreshToken;

  try {
    if (!user.refresh_token) throw new Error("No refresh token in DB. Generate one");

    // Check if the refresh token is valid, if not go to catch block
    jwt.verify(user.refresh_token, process.env.REFRESH_TOKEN_SECRET as string);

    return user.refresh_token; // If valid return the refresh token that was in DB
  } catch {
    // If refresh token is expired or it doesn't exist in DB, create a new one
    refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string);

    await User.findByIdAndUpdate(user.id, {
      refresh_token: refreshToken,
    });
  }

  return refreshToken;
}

export default {
  validatePassword,
  generatePassword,
  createAccessToken,
  createOrRetrieveRefreshToken,
};
