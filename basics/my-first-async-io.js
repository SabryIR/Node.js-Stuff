const fs = require('fs');

fs.readFile(process.argv[2], 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler:', err);
        return;
    }
    
    let strs = data.split('\n');

    console.log(strs.length - 1);
});