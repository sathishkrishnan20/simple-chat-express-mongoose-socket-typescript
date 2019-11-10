import express = require('express');
import MessageModel from '../schemas/Message';
import { IMessage } from '../schemas/IMessage';
import { ObjectID } from 'bson';
import io from '../server';
class MessageService {
    public router = express.Router();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        this.router.post('/message', this.insertMessage);
        this.router.get('/conversation/:conversationId/messages', this.getMessagesByConversationId);
    }

    getMessagesByConversationId = async(request: any, response: any) => {
        try {
         const conversationId = request.params.conversationId;
         const queryParams = request.query;
         let messages = await MessageModel.find({ 
             conversation_id: new ObjectID(conversationId)
         }).skip(parseInt(queryParams.skip) || 0)
           .limit(parseInt(queryParams.limit || 0 ))
           .sort({ created_at: -1 });
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

    insertMessage = async(request: any, response: any) => {
        try {
            const requestData = request.body;  
            const messageData = {
                conversation_id: requestData.conversation_id,
                message: requestData.message,
                sender_id: requestData.sender_id,
                created_at: new Date(),
                updated_at: new Date()
            }
            var messageModelData = new MessageModel(messageData);
            const savedResult = await messageModelData.save();       // mongoose Document methods are available
            console.log('data saved');
            
            io.emit('message', messageData)
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
    
}
export default MessageService;