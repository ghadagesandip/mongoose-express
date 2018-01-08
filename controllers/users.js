var User = require('../models/user');

module.exports = {

    add : function (req, resp) {
        var user = new User(req.body);
        user.save( function (err, data) {
            if(err){
                resp.status(400).send({message:'error occurred while saving data', error: err})
            }else{
                resp.json(data)
            }
        })
    }
}