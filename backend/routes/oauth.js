import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";
import crypto from "crypto";

//DB CALLER
import { authenticate } from "../controllers/user.js";

const router = express.Router();
const secret = process.env.SECRET;

// create a sha-256 hasher

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT_URL = process.env.MODE == "DEV" ? "http://localhost:" + process.env.FRONTEND_PORT : "";
const SERVER_URL = process.env.MODE == "DEV" ? process.env.DEV_URL : process.env.PRO_URL;

//設定passport
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: SERVER_URL + "/oauth/google/callback",
      passReqToCallback: true,
    },
    async function (request, res, accessToken, refreshToken, profile, done) {
      try {
        const user_email = profile._json.email;

        //使用email hash出 使用者id
        const sha256Hasher = crypto.createHmac("sha256", secret);
        const user_id = sha256Hasher.update(user_email).digest('base64');

        //確認此使用者是否已經存在WALLET的DB

        const user_exist = await authenticate(user_id);

        if (user_exist) {
          return done(null,
            {
              result: "USER_EXIST_IN_DB",
              user_id: user_id,
            });
        }
        else {
          return done(null,
            {
              result: "USER_NOT_EXIST_IN_DB",
              user_id: user_id,
              channel: "GOOGLE",
              channel_id: profile._json.sub,
              email: profile._json.email,
              username: profile._json.username,
            });
        }
      }
      catch (err) {

        //寫到紀錄檔，尚未實作
        console.log(err);
        var response = {
          "success": false,
          "message": "註冊使用者失敗",
          "data": undefined
        }
        res.status(400).json(response);
      }
    }
  )
);

//設定passport
passport.serializeUser(function (user, done) {
  done(null, user);
});

//設定passport
passport.deserializeUser(function (user, done) {
  done(null, user);
});

//GOOGLE OAUTH LOGIN
router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//GOOGLE OAUTH CALLBACK HANDLER
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/oauth/google/success",
    failureRedirect: "/oauth/google/failure",
  }
  )
);

//GOOGLE OAUTH SUCCESS CALLBACK
router.get("/google/success", isLoggedIn, (req, res) => {

  //若尚未註冊，回到前端註冊頁
  console.log('req.user :', req.user);
  console.log("session")
  console.log(req.sessionID, req.session, res.getHeaders())
  if (req.user.result === "USER_NOT_EXIST_IN_DB") {
    res.redirect(CLIENT_URL + "/callback/signup");
  }
  else {
    res.redirect(CLIENT_URL + "/login");
  }
});

//GOOGLE OAUTH FAILURE CALLBACK
router.get("/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

//GOOGLE OAUTH SUCCESS MIDDLEWARE
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

//登出 (暫時不用)
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

export default router;
