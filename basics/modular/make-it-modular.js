const mymodule = require('./mymodule');
let dir = process.argv[2];
let ext = process.argv[3];

mymodule(dir, ext, (err, list) => {
    if (err) {
        return console.error('Erro ao ler:', err);
    }
    list.forEach(function (file) {
        console.log(file);
    })
});