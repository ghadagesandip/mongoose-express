var express = require('express')
var router = express.Router();
var CategoriesCtl = require('../controllers/categories')
var cache = require('express-redis-cache')();


router.get('/',cache.route(), CategoriesCtl.getCategories);
router.put('/:id', CategoriesCtl.updateCategory);
router.post('/', CategoriesCtl.addCategory);
module.exports = router;