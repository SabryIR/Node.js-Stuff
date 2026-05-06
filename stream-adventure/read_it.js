const { Readable } = require('stream');
class MyStream extends Readable {
    _read() {}
}
const stream = new MyStream();

stream.push(process.argv[2]);
stream.pipe(process.stdout);