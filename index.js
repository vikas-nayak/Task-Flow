const http = require('http');

const server = http.createServer((req, res)=>{
    res.end("helllloooowwwwwwwww")
}).listen(6969)