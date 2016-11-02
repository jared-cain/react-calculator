var express = require('express');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 4321;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/dist'));

app.listen(server_port, server_ip_address);

console.log(`Running on port ${server_port}`);
