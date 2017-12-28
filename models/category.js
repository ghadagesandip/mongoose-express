var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
   title : {
       type : String,
       required : [true, 'Enter title'],
       validate : {
           validator : function (val, cb) {
               this.constructor.findOne({title : val, _id:{$ne:this._id}})
                   .then(function (doc) {
                       if(doc)
                            return cb(false);
                       else
                           return cb(true);
                       
                   })
                   .catch(function(err) {
                       return cb(false);
                   });
           },
           message : 'title need to be unique.'
       }
   },
   description : {
       type : String,
       required : [true, 'Enter description.']
   }
});

CategorySchema.static.getTitleByName = function (name, cb) {
    return this.find({title : name}, cb);
};

var Category =  mongoose.model('Category',CategorySchema);
module.exports = Category;

