#!/usr/bin/env node

import config from './config';
import express = require('express');
const app: express.Application = express();
const bodyParser = require('body-parser');
const connect = require("./dbconnect");
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token, userId,doctorId,adminId');
    next();
});

app.use('/api', require('./services/chat.service'));
app.use('/api', require('./services/message.service'));

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    console.error('Unable to listen for connections', error)
    process.exit(10)
  }
  console.info('express is listening on http://' +
    config.express.ip + ':' + config.express.port)
});
module.exports = app;