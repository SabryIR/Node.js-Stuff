const { Transform } = require('stream');

process.stdin.pipe(
    new Transform ({
        transform(chunk, encodding, callback) {
            callback(null, chunk.toString().toUpperCase());
        }
    })
).pipe(process.stdout);