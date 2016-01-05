var base = require('./base'),
    _ = require('lodash'),
    heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

configurator.export('node-workshop-book-inv-test').then(function (result) {
    console.log(result);
});

var config = _.merge({}, base, { name: 'node-workshop-book-inv-test',
    formation: [
        { process: 'web', quantity: 1, size: 'Free' }
    ],
    domains: [ 'node-workshop-book-inv-test.herokuapp.com' ] });

console.log(config);

configurator(config);
