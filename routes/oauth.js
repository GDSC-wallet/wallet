import express from "express";
import jwt from "jsonwebtoken";
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
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth/google/callback",
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

router.get("/", (req, res) => {
  res.send('<a href="/user/google">Authenticate with Google</a>');
});

router.get(
  "/google/login",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/oauth/google/protected",
    failureRedirect: "/api/oauth/google/failure",
  }
  )
);

router.get("/google/protected", isLoggedIn, (req, res) => {
  console.log('req.sessionStore.sessions :', req.sessionStore.sessions);
  //做jwt放header
  const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

  res.header('Authorization', auth)
  res.redirect('http://localhost:3000')
});

router.get("/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
  });

//test
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

router.post("/google/login", signin);
router.post("/google/redirect", signup);
router.post("/googlesignin", googleSignIn);

export default router;