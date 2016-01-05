var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var collection = null;
var url = 'mongodb://localhost:27017/booksinventory';
var collection = MongoClient.connect(url).then(function (db) {
    return db.collection('books');
});

function getByIsbn(isbn) {
    return collection
        .then(function (result) {
            return result.find({isbn: isbn}).toArray();
        })
        .then(function (result) {
            return new Promise(function (resolve, reject) {
                if (result.length === 0) {
                    return resolve();
                }
                return resolve(result[0]);
            });
        });
}

function save(book) {
    return collection
        .then(function (result) {
            return result.updateOne({isbn: book.isbn}, book, {upsert: true});
        });
}

module.exports = {
    save: save,
    getByIsbn: getByIsbn
};
