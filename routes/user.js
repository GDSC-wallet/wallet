import express from "express";
const router = express.Router();

import { signin, signup, googleSignIn } from "../controllers/user.js";

import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Add headers
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://nccucourseguide.herokuapp.com"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy.Strategy(
    {
      // authorizationURL: 'https://www.example.com/oauth2/authorize',
      // tokenURL: 'https://www.example.com/oauth2/token',
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:80/user/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log('request :', request);
      console.log('accessToken :', accessToken);
      console.log('refreshToken :', refreshToken);
      console.log('profile :', profile);
      console.log('done :', done);

      //在這裡處理db ()
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      const user_exist = true;

      if(user_exist){
        return done(null, 
          {
            test:"test",
            profile
          });
      }
      else{
        return done(null, "user not exist in postgres db");
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//test
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/", (req, res) => {
  res.send('<a href="/user/google">Authenticate with Google</a>');
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user/protected",
    failureRedirect: "/user/google/failure",
  }
  )
);

router.get("/user/protected", isLoggedIn, (req, res) => {
  console.log('req :', req);
  console.log('req.sessionStore.sessions :', req.sessionStore.sessions);
  // res.send(`Hello ${req.user.displayName}`);
  res.redirect('http://localhost:3000')
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

router.get("/user/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googlesignin", googleSignIn);

export default router;