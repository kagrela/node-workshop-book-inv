var request = require('supertest'),
    app = require('../app.js');

describe('POST /book', function(){
    it('returns book', function(done){
        request(app)
            .post('/book')
            .set('Content-Type', 'application/json')
            .send({'isbn': '1617291781', 'count': 10})
            .expect(200, {
                isbn: '1617291781',
                count: 10
            }, done);
    })
});
