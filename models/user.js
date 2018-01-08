var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email : {
        type : String,
        unique : true,
        lowercase : true,
        required  : true
    },
    password :{
        type : String,
        required  : true
    },
    name : {
        type : String,
        required  : true
    },
    gender : {
        type : String,
        required  : true,
        enum : ['Male','Female']
    }   
});




UserSchema.pre('save', function (next) {
    var user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, function (err, salt) {
           if(err){
               return next(err);
           }
            bcrypt.hash(user.password, salt, function (error, hash) {
                if(err){
                    return next(err)
                }
                user.password = hash;
                next();
            })
        })
    }else{
        return next();
    }
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