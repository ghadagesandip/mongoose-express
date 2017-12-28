var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/weddingapp',{
    useMongoClient:true
});

mongoose.promise = global.Promise;

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));
db.on('open', function () {
    console.log('conncted to db');
})