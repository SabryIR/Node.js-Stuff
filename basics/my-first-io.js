const fs = require('fs');

let buf = fs.readFileSync(process.argv[2], 'utf8');

let strs = buf.split('\n');

console.log(strs.length - 1);