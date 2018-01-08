var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, passport, done) {
        User.getUsernByEmail(email, function (err, user) {
            if(err) throw err;
            if(!user){
                return done(null, false, {message : 'unknown user'})
            }

            user.comparePassword(passport, user.password, function (err, isMatch) {

                if(err) throw err;

                if(isMatch){
                    return done(null, user)
                }else {
                    return done(null, false, {message: 'invalid user'})
                }
            })
        })
    }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user)
    })
});

