import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import User from "./mongoose/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as utils from "./jwt/utils";
import cors from "cors";
import fs from "fs";

import https from "https";

import type { UserType } from "./mongoose/User";
import { TRPCError } from "@trpc/server";

// TODO: Fix this
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

mongoose.connect(process.env.MONGODB_URI as string);

const app = express();
app.use(
  cors({
    origin: `https://${process.env.FRONTEND_URI}:3000`,
    credentials: true,
  })
);

// tRPC config
import appRouter from "./tRPC";

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
  if (req.headers.authorization) {
    return {
      jwt: req.headers.authorization.split(" ")[1],
    };
  } else {
    throw new TRPCError({ message: "Access token not provided", code: "UNAUTHORIZED" });
  }
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(express.json());

import passport from "passport";
app.use(passport.initialize());
import jwtPassport from "./jwt/passport";
jwtPassport(passport);

app.post("/login", express.urlencoded({ extended: false }), async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    }).exec();

    console.log(req.body);

    if (!user) {
      return res.status(401).json({ success: false, message: "Your username is incorrect" });
    }

    const passwordIsCorrect = req.body.password === user.password;

    if (passwordIsCorrect) {
      const JWT_OBJ = utils.createAccessToken(user);

      res.status(200).json({
        accessToken: JWT_OBJ.token,
        success: true,
      });
    } else {
      res.status(401).json({ message: "Your password is incorrect", success: false });
    }
  } catch (err) {
    return next(err);
  }
});

app.post("/protected", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  let userToken = req.headers["authorization"]?.split(" ")[1];

  if (userToken) {
    const userData = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET as string) as UserType;
    console.log(await User.findById(userData.id));
  } else {
    res.status(503).json({ message: "No JWT in request" });
  }

  res.status(200).json({ message: "Successfully accessed protected route! 🎉👌" });
});

app.post("/register", async (req, res) => {
  const userDoc = new User({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
  });
  await userDoc.save();

  res.end();
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4000, () => console.log("Listening on port 4000"));
// console.log(path.resolve(__dirname, "..", "src", "private_key.pem"));

// https
//   .createServer(
//     {
//       key: fs.readFileSync(path.resolve(__dirname, "..", "src", "private_key.pem")),
//       cert: fs.readFileSync(path.resolve(__dirname, "..", "src", "server.pem")),
//     },
//     app
//   )
//   .listen(4000, () => {
//     console.log("Listening on port 4000");
//   });

// export type definition of API
export type AppRouter = typeof appRouter;
