import express = require('express');
//const router = express.Router();
let router = express.Router();
import ConversationModel from '../schemas/Conversation';
import { IConversation } from '../schemas/IConversation';
const getMessages = async(request: any, response: any) => {
    console.log('Hellos');
    ConversationModel.findOne({}, (err: any, user: IConversation) => {
        user.connections;   // IUser properties are available
        console.log(user);
        response.send({
            success: true,
            user
        })
          // mongoose Document methods are available
      });
      
    
}
/* 
Sample Request for creating the chat
{
	"connections": [userId1, userId2],
} */
const createConversation = async(request: any, response: any) => {
  try {
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

router.post('/conversation', createConversation);
export = router;
