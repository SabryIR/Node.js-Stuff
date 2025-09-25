const fs = require('fs');

let dir = process.argv[2];

let ext = '.' + process.argv[3];

fs.readdir(dir, (err, list) => {
    if (err) {
        console.error('Erro ao ler:', err);
        return;
    }

    const path = require('path');
    
    list.forEach(function (file) {
        if (path.extname(file) == ext) {
            console.log(file);
        }
    })
});