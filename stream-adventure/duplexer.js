const { spawn } = require('child_process');
const Duplexer2 = require('duplexer2');

module.exports = function (command, args) {
    const child = spawn(command, args);

    return Duplexer2(child.stdin, child.stdout);
};