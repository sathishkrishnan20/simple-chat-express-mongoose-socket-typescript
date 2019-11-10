
let config = {
  express: {
    port: process.env.EXPRESS_PORT || 3000,
    ip: 'localhost'
  },
  mongodb: {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost',
    database: process.env.MONGODB || 'chat-dev'
  }
};

export default config;