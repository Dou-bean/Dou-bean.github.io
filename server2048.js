var fs = require('fs');
var htmlfile;
fs.readFile('my2048.html', 'utf-8', function(err, data){
    if(err) console.log(err);
    else{ 
        htmlfile = data;
    }
});

var http = require('http');
var server = http.createServer(function(request, response){
    console.log(request.method + ':' + request.url);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(htmlfile);
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');