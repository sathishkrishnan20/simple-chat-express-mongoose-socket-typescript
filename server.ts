
import app from './app';
import config from './config';
import socketIo =  require('socket.io');
import { createServer } from 'http';
var server = createServer(app);

server.listen(config.express.port, config.express.ip, () => {
    console.info('express is listening on http://' +
    config.express.ip + ':' + config.express.port)
});

let io : SocketIO.Server = socketIo(server)
io.on('connect', (socket: any) => {
  console.log('Connected client on port.');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  }); 
});
export default io;