const http = require('http');
const url = require('url');
let portNumber = process.argv[2];

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    function prepareError() {
        res.writeHead(404);
        res.end();
    }

    if (req.method == "GET") {
        if (parsedUrl.pathname == "/api/parsetime" && query.iso) {
            res.writeHead(200, {"content-type": "application/json"});

            const data = new Date(query.iso);

            res.end(JSON.stringify({
                hour: data.getHours(),
                minute: data.getMinutes(),
                second: data.getSeconds()
            }));
        }
        else if (parsedUrl.pathname == "/api/unixtime" && query.iso) {
            res.writeHead(200, {"content-type": "application/json"});

            const data = new Date(query.iso);

            res.end(JSON.stringify({ unixtime: data.getTime()}));
        }
        else {
            prepareError();
        }
    }
    else {
        prepareError();
    }
});

server.listen(Number(portNumber));