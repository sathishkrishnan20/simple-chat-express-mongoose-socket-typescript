#!/usr/bin/env node

import express = require('express');
//const app: express.Application = express();
const bodyParser = require('body-parser');

import { createServer, Server } from 'http';
//require the http module
class App {
  public app: express.Application;
  public server: Server = new Server; 
  public port: number;
  public ip: string;
  constructor(controllers:any[] , host: string, port: number) {
    this.app = express();
    this.ip = host;
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.createServer();
  }
  private initializeMiddlewares() {
     this.app.use(bodyParser.json());
     
  }
  private initializeControllers(controllers : any) {
    controllers.forEach((controller : any) => {
      this.app.use('/api', controller.router);
    });
  }
  createServer() {
    this.server = createServer(this.app)
  }
  public listen() {
    this.server.listen(this.port, this.ip, () => {
      console.info('express is listening on http://' +
     this.ip + ':' +this.port)
  });
  }
}
export default App;