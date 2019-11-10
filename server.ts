
import App from './app';
import config from './config';
import socketIo =  require('socket.io');
import { createServer } from 'http';
import ConversationService from './services/conversation.service';
import MessageService from './services/message.service';
import Connect from "./dbconnect";

const mongoConnect = new Connect(config.mongodb.host,config.mongodb.port,config.mongodb.database);
mongoConnect.connect();
const app = new App([
      new ConversationService(),
      new MessageService
    ],
    config.express.ip,
    config.express.port
);

app.listen();  
let io : SocketIO.Server = socketIo(app.server)
io.on('connect', (socket: any) => {
  console.log('Connected client on port.');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  }); 
});
export default io;