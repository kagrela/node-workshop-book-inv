var books = {};

function getByIsbn(isbn) {
    return new Promise(function(resolve, reject)  {
        resolve(books[isbn]);
    });
}

function save(book) {
    return new Promise(function (resolve, reject) {
        books.isbn = book;
        resolve();
    });
}

module.exports = {
    save: save,
    getByIsbn: getByIsbn
};
