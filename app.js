var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/bookinventory';

var logRequest = function (req, res, next) {
    console.log('Req:', Date.now());
    next();
};

app.use(logRequest);

app.use(bodyParser.json());


app.post('/stock', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log('Connected correctly to server');
        // Get the documents collection
        var collection = db.collection('stocks');
        // Update document where a is 2, set b equal to 1
        collection.updateOne({isbn: req.body.isbn}, {isbn: req.body.isbn, count: req.body.count}, {upsert: true},
            function (err, result) {
                db.close();
                if (err) {
                    return next(err);
                }
                res.send({isbn: req.body.isbn, count: req.body.count});
            });
    });
});

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.stack);
    res.json({
        message: err.message,
        error: (process.env.NODE_ENV !== 'production') ? err.toString() : {}
    });
}

app.use(clientError);
app.use(serverError);

module.exports = app;

//use updateOne function with upsert option
//mongod by default starts on port 27017
