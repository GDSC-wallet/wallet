//NODE MODULES
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

//DB CALLER
import db_caller from "../db_interact/db_caller.js";

const router = express.Router();
const secret = "GDSC_WALLET";

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//設定passport
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try{

          //確認此使用者是否已經存在WALLET的DB
          const user_exist = await db_caller.authenticate('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')          
          
          if(user_exist){
              return done(null, 
                {
                    test:"hello",
                    profile
                });
            }
            else{
                return done(null, "user not exist in db");
            }
      }
      catch(err){

        //寫到紀錄檔，尚未實作
        console.log('err :', err);

        //把error throw出來，express預設會接住err並自動回傳400,
        throw err
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
    successRedirect: "/api/oauth/google/protected",
    failureRedirect: "/api/oauth/google/failure",
  }
  )
);

//GOOGLE OAUTH SUCCESS CALLBACK
router.get("/google/protected", isLoggedIn, (req, res) => {

  //製作jwt
  const { email , id } = req.user.profile;
  const token = jwt.sign( { id: id }, secret, { expiresIn: "1h" } );

  res.header('Authorization', token);
  res.redirect('http://localhost:3000')
});

//GOOGLE OAUTH FAILURE CALLBACK
router.get("/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
});

//GOOGLE OAUTH CHECK LOGIN
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