import * as express from 'express';
import ConversationModel from '../schemas/Conversation';

class ConversationService {
    public router = express.Router();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        this.router.post('/conversation', this.createConversation);
    }
/* 
  Sample Request for creating the chat {
	"connections": [userId1, userId2],
  } 
*/
createConversation = async(request: express.Request, response: express.Response) => {
    try {
      console.log('is it comign');
      const requestData = request.body;  
      var conversation = new ConversationModel({
              connections: requestData.connections,
              created_at: new Date(),
      });
      const savedResult = await conversation.save();       // mongoose Document methods are available
      console.log(savedResult);
      response.send({
          success: true,
          conversationId: savedResult._id
      })
    } catch (err) {
      console.log('err' + err);
      response.status(500).send({
          ...err,
          success: false
      })
    }
  }
}

export default ConversationService;
