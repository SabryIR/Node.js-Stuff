const http = require('http');
const fs = require('fs');
const { Transform } = require('stream');
const server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        req.pipe(
            new Transform ({
                transform(chunk, encodding, callback) {
                    callback(null, chunk.toString().toUpperCase());
                }
            })
        ).pipe(res);
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed. Please use POST.\n');
    }
})

server.listen(process.argv[2]);