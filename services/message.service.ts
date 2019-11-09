import express = require('express');
//const router = express.Router();
let router = express.Router();
import MessageModel from '../schemas/Message';
import { IMessage } from '../schemas/IMessage';
import { ObjectID } from 'bson';

const getMessagesByConversationId = async(request: any, response: any) => {
   try {
    const conversationId = request.params.conversationId;
    let messages = await MessageModel.find({ 
        conversation_id: new ObjectID(conversationId)
    }).sort({ created_at: -1 });
    response.send({
        success: messages.length > 0 ? true : false,
        data: messages
    });
} catch (err) {
    console.log('err' + err);
    response.status(500).send({
        ...err,
        success: false
    })
  }
    
}

/* 
Sample Request for creating the chat
{
    conversation_id: String,
    message: String,
    sender_id: String
} 
*/
const insertMessage = async(request: any, response: any) => {
    try {
        const requestData = request.body;  
        const messageData: IMessage = {
            conversation_id: requestData.conversation_id,
            message: requestData.message,
            sender_id: requestData.sender_id,
            created_at: new Date(),
            updated_at: new Date()
        } 
        var messageModelData = new MessageModel(messageData);
        const savedResult = await messageModelData.save();       // mongoose Document methods are available
        console.log(savedResult);
        response.send({
            success: true,
            chatId: savedResult._id
        })
      } catch (err) {
        console.log('err' + err);
        response.status(500).send({
            ...err,
            success: false
        })
      }
}

router.post('/message', insertMessage);
router.get('/conversation/:conversationId/messages', getMessagesByConversationId);
export = router;
