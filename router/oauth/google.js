var express = require('express');

var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

passport.use(
    new GoogleStrategy({
        clientID: process.env['GOOGLE_CLIENT_ID'],
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
        callbackURL: '/oauth/google/redirect',
    },
    function(issuer, profile, cb){
        console.log(profile)
    })
)

router.get('/', (req, res) => {
    res.send("google");
})

router.get('/login', passport.authenticate('google', {
    scope: [ 'profile' ]
}));

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    res.send("hi")
});

module.exports = router;