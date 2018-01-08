var User = require('../models/user');

module.exports = {

    add : function (req, resp) {
        var user = new User(req.body);
        user.generateHash(user.password, function (err, hashedPassword) {
            user.password = hashedPassword;

            user.save( function (err, data) {
                console.log(err, data)
            })

        });

    }
}