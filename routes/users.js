var express = require('express');
var router = express.Router();
var passport = require('passport');
var UsersCtrl = require('../controllers/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',

    passport.authenticate('local'),

    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        console.log(req)
      res.json(req.user);
    });

router.post('/register',UsersCtrl.add);


module.exports = router;
