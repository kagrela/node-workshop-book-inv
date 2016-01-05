var booksRepository = require('../main/books-repository'),
    app = require('../main/app')(booksRepository);

app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
