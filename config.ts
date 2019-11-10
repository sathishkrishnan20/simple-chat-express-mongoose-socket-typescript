
/*var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test';
var QA = process.env.NODE_ENV === 'qa'; */
var DEVELOPMENT = process.env.NODE_ENV === 'development';
let config: any = {};

config.express = {
  port: process.env.EXPRESS_PORT || 4000,
  ip: 'localhost'
}
config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost',
  database: process.env.MONGODB || 'chat'
}
if (DEVELOPMENT) {
  config.express = {
    port: 3000,
    ip: '192.168.1.3'
  }
  config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    database: process.env.MONGODB || 'chat-dev'
  }
}

export default config;