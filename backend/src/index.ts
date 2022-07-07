import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import User from "./mongoose/User";
import mongoose from "mongoose";
import utils from "./jwt/utils";
import path from "path";
// TODO: Fix this
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const url =
  "mongodb+srv://bigpappa:bigpappa@mycluster.wzkabhg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

const app = express();

// tRPC config
import appRouter from "./tRPC";

// created for each request
const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

import session from "express-session";
import MongoStore from "connect-mongo";

app.use(
  session({
    secret: "foo",
    store: MongoStore.create({
      mongoUrl: url,
    }),
    saveUninitialized: false,
    resave: true,
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

    if (!user) {
      return res.status(401).json({ success: false, message: "Your username is incorrect" });
    }

    const passwordIsCorrect = req.body.password === user.password;

    if (passwordIsCorrect) {
      const JWT_OBJ = utils.createAccessToken(user);
      // const refreshToken = await utils.createOrRetrieveRefreshToken(user, next);

      // res.cookie("refreshToken", refreshToken, {
      //   maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in ms
      //   httpOnly: true,
      // });

      res.status(200).json({
        accessToken: JWT_OBJ.token,
        // expiresIn: JWT_OBJ.expires,
        success: true,
      });
    } else {
      res.status(401).json({ message: "Your password is incorrect", success: false });
    }
  } catch (err) {
    return next(err);
  }
});

app.post("/getinfo", (req, res) => {
  console.log(req.session.username);
  res.json({ stored: req.session.username });
});

import jwt from "jsonwebtoken";

app.post("/protected", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
  let userToken = req.headers["authorization"]?.split(" ")[1];

  if (userToken) {
    let userData = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("/protected route request -> id:", userData.id);
    console.log(await User.findById(userData.id));
  } else {
    res.status(503).json({ message: "No JWT in request" });
  }

  res.status(200).json({ message: "Successfully accessed protected route! 🎉👌" });
});

app.post("/register", async (req, res) => {
  console.log(req.body);

  const userDoc = new User({ username: "angelo", password: "ciao", firstname: "Angelo" });
  await userDoc.save();

  res.end();
  // res.json({ stored: req.session.user });
});

app.get("/logout", function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(4000, () => console.log("Listening on port 4000"));

// export type definition of API
export type AppRouter = typeof appRouter;
