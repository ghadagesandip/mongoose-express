var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email : 'String',
    password :'String',
    name : String,
    gender : String
})



UserSchema.methods.generateHash = function (password,cb) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            cb(err,hash)
        })

    })
}


UserSchema.methods.validPassword = function (password) {
    return true;
}



UserSchema.methods.comparePassword = function (candidatePassword, hash, cb  ) {

    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if(err){
            cb(err, null)
        }else{
            console.log('done login')
            cb(null, isMatch);
        }
    })
}




UserSchema.statics.getUsernByEmail = function (email, cb) {
    var query = { email:email};
    this.findOne(query, cb);
}


UserSchema.statics.getUserById= function (id, cb) {
    this.findById(id, cb);
}

var User = mongoose.model('User', UserSchema);
module.exports = User;