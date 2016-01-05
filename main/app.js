var bodyParser = require('body-parser'),
    express = require('express'),
    app = express(),
    routes = require('./middleware/routes'),
    logRequest = require('./middleware/log-request'),
    clientError = require('./middleware/client-error'),
    serverError = require('./middleware/server-error');

module.exports = function (booksRepository) {

    app.use(logRequest);

    app.use(bodyParser.json());

    app.post('/book', routes(booksRepository).save);

    app.get('/book/:isbn', routes(booksRepository).getBookByIsbn);

    app.use(clientError);

    app.use(serverError);

    return app;
};
