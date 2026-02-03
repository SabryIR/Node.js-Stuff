const fs = require('fs');
const http = require('http');
const map = require('through2-map');
let portNumber = process.argv[2];

const server = http.createServer(function (req, res) {
    if (req.method == "POST") {
        res.writeHead(200, {"content-type": "text/plain"});
        req.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(res);
    }
    else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(Number(portNumber));