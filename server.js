var express = require('express');
var app = express();

var port = 4321;

app.use(express.static(__dirname + '/dist'));

app.listen(port);

console.log(`Running on port ${port}`);
