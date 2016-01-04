var bodyParser = require('body-parser'),
    express = require('express'),
    app = express();

module.exports = function (booksRepository) {

    var logRequest = function (req, res, next) {
        console.log('Req:', Date.now());
        next();
    };

    app.use(logRequest);

    app.use(bodyParser.json());

    app.get('/book/:isbn', function (req, res, next) {
        booksRepository.getByIsbn(req.params.isbn)
            .then(function (result) {
                if (result) {
                    return res.send(result);
                }
                return next();
            });
    });

    app.post('/book', function (req, res, next) {
        booksRepository.save({isbn: req.body.isbn, count: req.body.count})
            .then(function (result) {
                res.send({isbn: req.body.isbn, count: req.body.count});
            })
            .catch(function (error) {
                next(error);
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

    return app;
};
