// var passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy,
//     User = require('../models/user');
//
//
// passport.use(new LocalStrategy(
//     {
//         usernameField: 'email',
//         passwordField: 'password'
//     },
//     function (email, passport, done) {
//         User.getUsernByEmail(email, function (err, user) {
//             if(err) throw err;
//             if(!user){
//                 return done(null, false, {message : 'unknown user'})
//             }
//
//             user.comparePassword(passport, function (err, isMatch) {
//
//                 if(err) throw err;
//
//                 if(isMatch){
//                     return done(null, user)
//                 }else {
//                     return done(null, false, {message: 'invalid user'})
//                 }
//             })
//         })
//     }
// ));
//
//
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.getUserById(id, function (err, user) {
//         done(err, user)
//     })
// });
//


var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('./main');

console.log('config.secret', config.secret);


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('jwt_payload', jwt_payload)
        User.findOne({id : jwt_payload.id}, function (err, user) {
            if(err){
                return done(err, false)
            }else{
                if(user){
                    return done(null, user)
                }else{
                    return (null, false);
                }
            }
        });
    }));
};