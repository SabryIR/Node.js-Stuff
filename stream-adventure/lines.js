let oddLine = true;
const split2 = require('split2');
const { Transform } = require('stream');

process.stdin.pipe(split2()).pipe(
    new Transform ({
        transform(chunk, encodding, callback) {
            oddLine 
                ? callback(null, chunk.toString().toLowerCase() + '\n')
                : callback(null, chunk.toString().toUpperCase() + '\n');
            oddLine = !oddLine;
        }
    })
).pipe(process.stdout);