var request = require('supertest'),
    app = require('../app.js');

describe('POST /stock', function(){
    it('returns stock', function(done){
        request(app)
            .post('/stock')
            .set('Content-Type', 'application/json')
            .send({'isbn': '1617291781', 'count': 10})
            .expect(200, {
                isbn: '1234567890'
            }, done);
    })
});
