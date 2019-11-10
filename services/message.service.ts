import express = require('express');
import { MessageModel } from '../schemas/Message';
import { ConversationModel } from '../schemas/Conversation';
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
            const conversationId = new ObjectID(requestData.conversation_id);
            const senderId = new ObjectID(requestData.sender_id);
            
             let conversationModelResp = await ConversationModel.findOne({ 
                 _id: new ObjectID(conversationId)
             }).where({ "members.member_id" : senderId })
             console.log(conversationModelResp);
             if(conversationModelResp === null) {
               return response.status(401).send({
                    success: false,
                    message: 'You are not allowed to Chat'
                })
             }             
             const messageData = {
                conversation_id: conversationId,
                sender_id: senderId,
                message: requestData.message,
                created_at: new Date(),
                updated_at: new Date(),
            }
            var messageModelData = new MessageModel(messageData);
            messageModelData.save();       // mongoose Document methods are available
            io.emit('message', messageData)
            response.send({
                success: true,
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