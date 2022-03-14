var express = require('express');

var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(
    new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/oauth/google/redirect',
        scope: [ 'profile' ]
    },
    function(issuer, profile, cb){
        console.log(issuer)
        console.log(profile)
    })
)

passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.name });
        });
    });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
  });

router.get('/', (req, res) => {
    res.send("google");
})

router.get('/login/', passport.authenticate('google'));

router.get('/redirect/', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
}));

module.exports = router;