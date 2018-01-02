var Category = require('../models/category.js');

module.exports = {
    
    getCategories : function (req, resp) {

        Category.find({},function (err, categories) {
            if(err){
                throw 'Error'
            }else{
                console.log('called db')
                resp.json(categories);
            }
        })
    },

    addCategory : function (req, resp) {
        var category = new Category(req.body);
        category.save(function (err, data) {
            if(err){
                resp.send(err)
            }else{
                resp.json(data);
            }
        })
    },

    updateCategory : function (req, resp) {
        console.log('req.params.id', req.params.id)
       /* Category.findById(req.params.id, function (err, category) {
            category.set(req.body)
            category.save(function (err, newCategory) {
                if (err) return resp.send(err);
                resp.send(newCategory);
            })
        })
        */
        Category.update({_id:req.params.id},{$set:req.body}, function (err, data) {
            if (err) return resp.send(err);
            resp.send(data);
        })
    },
    
    deleteCategory : function (req, resp) {
        Category.findByIdAndRemove(req.params.id, function (err, data) {
            if (err) return resp.send(err);
            resp.send(data);
        })
    }

    
}