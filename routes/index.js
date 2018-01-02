var express = require('express');
var router = express.Router();
var cache = require('express-redis-cache')();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/getAllCache', function (req, resp) {
    cache.get('/category', function (error, entries) {
        if ( error ) throw error;
        resp.json(entries);
    });
})

module.exports = router;
