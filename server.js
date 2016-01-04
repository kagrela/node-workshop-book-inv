var express = require('express');
var app = express();

var logRequest = function (req, res, next) {
    console.log('Req:', Date.now());
    next();
};

app.get('/', logRequest, function (req, res, next) {
    throw new Error('Its your fault');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
