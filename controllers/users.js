var User = require('../models/user');
var config = require('../config/main');
var jwt = require('jsonwebtoken');

module.exports = {

    login : function (req, resp) {
        User.findOne({
            email : req.body.email
        }, function (err, user) {
            if(err)
                throw err;

            if(!user){
                resp.send({success : false, message : 'Authentication failed'})
            }else{
                user.comparePassword(req.body.password, function (err, iMatch) {

                    if(iMatch && !err){
                        var token = jwt.sign(user.toJSON(),config.secret,{
                            expiresIn : 604800 //in seconds
                        } )

                        resp.json({success : true, message: 'done', token : token})
                    }else{
                        resp.json({success: false, message : "password does not match"})
                    }
                })
            }
        })
    },

    add : function (req, resp) {
        var user = new User(req.body);
        user.save( function (err, data) {
            if(err){
                resp.status(400).send({message:'error occurred while saving data', error: err})
            }else{
                resp.json(data)
            }
        })
    },

    dashboard : function (req, resp) {
        resp.send('it worked user id'+ req.user)

    }
}