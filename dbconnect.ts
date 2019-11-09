import mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
import config from './config';
var dbURI = "mongodb://" + 
			//encodeURIComponent(config.db.username) + ":" + 
			//encodeURIComponent(config.db.password) + "@" + 
			config.mongodb.host + ":" + 
			config.mongodb.port + "/" + 
			config.mongodb.database;
            mongoose.connect(dbURI, { 
                                useNewUrlParser: true, 
                                useUnifiedTopology: true 
            });

// Throw an error if the connection fails
mongoose.connection.on('error', function(err: any) {
	if(err) throw err;
});

// mpromise (mongoose's default promise library) is deprecated, 
// Plug-in your own promise library instead.
// Use native promises
mongoose.Promise = global.Promise;

module.exports = { mongoose, 
	models: {
        conversation: require('./schemas/Conversation'),
        message: require('./schemas/Message'),
    }
};