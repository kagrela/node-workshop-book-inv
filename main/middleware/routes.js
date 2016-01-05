module.exports = function (booksRepository) {
    return {
        getBookByIsbn: function (req, res, next) {
            booksRepository.getByIsbn(req.params.isbn)
                .then(function (result) {
                    if (result) {
                        return res.send(result);
                    }
                    return next();
                });
        },
        save: function (req, res, next) {
            booksRepository.save({isbn: req.body.isbn, count: req.body.count})
                .then(function (result) {
                    res.send({isbn: req.body.isbn, count: req.body.count});
                })
                .catch(function (error) {
                    next(error);
                });
        }
    };
};
