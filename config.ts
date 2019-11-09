
var PRODUCTION = process.env.NODE_ENV === 'production';
var TEST = process.env.NODE_ENV === 'test';
var QA = process.env.NODE_ENV === 'qa';
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

if (PRODUCTION) {
  config.express = {
    port: 4000,
    ip: 'medflic.com'
  }
} else if (QA) {
  config.express = {
    port: 4000,
    ip: 'ec2-15-206-27-252.ap-south-1.compute.amazonaws.com'
  }
  config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    database: 'chat'
  }
} else if (DEVELOPMENT) {
  config.express = {
    port: 4000,
    ip: 'localhost'
  }
  config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    database: process.env.MONGODB || 'chat-dev'
  }

} else if (TEST) {
  config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    database: process.env.MONGODB || 'chat_test'
  }
}

export default config;