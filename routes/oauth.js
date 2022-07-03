import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";
import crypto from "crypto";

//DB CALLER
import User from "../db_interact/user.js";

const router = express.Router();
const secret = "GDSC_WALLET";

// create a sha-256 hasher

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;
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
    async function (request, accessToken, refreshToken, profile, done) {
        try{
          const user_email = profile._json.email;
          
          //使用email hash出 使用者id
          const sha256Hasher = crypto.createHmac("sha256", secret);
          const user_id = sha256Hasher.update(user_email).digest('base64');

          //確認此使用者是否已經存在WALLET的DB
          const user_exist = await User.authenticate(user_id); 
          console.log('user_exist :', user_exist);
     
          if(user_exist){
              return done(null, 
                {
                    result:"USER_EXIST_IN_DB",
                    profile:{...profile,user_id:user_id}
                });
          }
            else{                
                return done(null,
                {
                    result:"USER_NOT_EXIST_IN_DB",
                    profile:{...profile,user_id:user_id}
                });
            }
        }
        catch(err){

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
    
    //製作jwt
    // console.log('req.user :', req.user);
    const { sub , name,email } = req.user.profile._json;
    const {  user_id } = req.user.profile;
    const channel="GOOGLE";
    const channel_id=sub;
    const username=name;
    const token = jwt.sign( { channel, channel_id, email, username, user_id }, secret, { expiresIn: "24h" } );

    res.header('Authorization', token);
    
    //若尚未註冊，回到前端註冊頁
    console.log('req.user :', req.user);
    if(req.user.result==="USER_NOT_EXIST_IN_DB"){
      const { sub , name,email } = req.user.profile._json;
      const {  user_id } = req.user.profile;
      const channel="GOOGLE";
      const channel_id=sub;
      const username=name;
      const token = jwt.sign( { channel, channel_id, email, username, user_id }, secret, { expiresIn: "24h" } );
      res.redirect("/callback/signup"+`?token=${token}`);
		return res;
    }
    else{
      const {  user_id } = req.user.profile;
      const token = jwt.sign( { user_id }, secret, { expiresIn: "24h" } );
        res.redirect("/callback/login"+`?token=${token}`);
		return res;
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
