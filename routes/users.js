var express = require('express');
var router = express.Router();
var passport = require('passport');
var UsersCtrl = require('../controllers/users');

var jwt = require('jsonwebtoken');

require('../config/passport');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource', req.user);
});

// router.post('/login',
//
//     passport.authenticate('local'),
//
//     function(req, res) {
//         // If this function gets called, authentication was successful.
//         // `req.user` contains the authenticated user.
//         console.log(req)
//       res.json(req.user);
//     });

router.post('/login', UsersCtrl.login)


router.post('/register',UsersCtrl.add);

router.get('/dashboard', passport.authenticate('jwt', {session: false}), UsersCtrl.dashboard)

module.exports = router;
