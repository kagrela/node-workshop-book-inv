var http = require('http');

var server = http.createServer(function (request, response) {
    response.end("Hello World\n");
});

server.listen(8000, function() {
    console.log("Server running at http://127.0.0.1:8000/");
});

