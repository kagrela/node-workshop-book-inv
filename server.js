var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var logRequest = function (req, res, next) {
    console.log('Req:', Date.now());
    next();
};

app.use(logRequest);

app.use(bodyParser.json());

app.post('/stock', function (req, res, next) {
    console.log('Saving isbn: %s, count: %s', req.body.isbn, req.body.count);
    res.send('Cool!');
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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
