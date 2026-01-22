const http = require('http');
const bl = require('bl');
let url = process.argv[2];

http.get(url, (response) => {
    response.pipe(bl(function(err, data) {
        if (err)
            return console.error(err);
        console.log(data.length);
        console.log(data.toString());
    }));
});