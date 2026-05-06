const { Writable } = require('stream');
class MyStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log('writing: ' + chunk.toString());
        callback();
    }
}
const stream = new MyStream();

process.stdin.pipe(stream);