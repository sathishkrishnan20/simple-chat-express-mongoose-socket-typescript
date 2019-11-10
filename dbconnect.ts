import mongoose = require('mongoose');
class MongoConnection {
    private dbURI : string;
    constructor(host: string, port: number, database: String) {
        this.dbURI = "mongodb://" + 
        //encodeURIComponent(config.db.username) + ":" + 
        //encodeURIComponent(config.db.password) + "@" + 
        host + ":" + 
        port + "/" + 
        database;
    }
    connect() {
        mongoose.connect(this.dbURI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        // Throw an error if the connection fails
        mongoose.connection.on('error', function(err: any) {
        if(err) throw err;
        });
        mongoose.Promise = global.Promise;
    }  
}
export default MongoConnection;