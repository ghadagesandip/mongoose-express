var express = require('express')
var router = express.Router();
var CategoriesCtl = require('../controllers/categories')

router.get('/', CategoriesCtl.getCategories);
router.put('/:id', CategoriesCtl.updateCategory);
router.post('/', CategoriesCtl.addCategory);
module.exports = router;