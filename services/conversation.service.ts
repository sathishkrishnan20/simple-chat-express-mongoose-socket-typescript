import * as express from 'express';
import { ConversationModel } from '../schemas/Conversation';
import { ObjectID } from 'bson';
class ConversationService {
    public router = express.Router();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        this.router.post('/conversation', this.createConversation);
        this.router.get('/conversations/member/:memberId', this.getConversationsByMemberId);
    }
/* 
  Sample Request for creating the chat {
	"connections": [userId1, userId2],
  } 
*/
getConversationsByMemberId = async (request: express.Request, response: express.Response) => {
  try {
    const requestData = request.params;  
    const memberId = requestData.memberId;
    let conversations = await ConversationModel.aggregate([
    {
     "$match" : {
       "members.member_id" : new ObjectID(memberId),
     },
    },
    {
      "$lookup" : {
        from: 'messages',
        as: 'messages',
        let: { id: "$_id" },
        pipeline : [
          { $match: { 
            $expr: { $eq: [ "$$id", "$conversation_id" ] }
          }},
         { $sort: { created_at: -1 } },
         { $limit: 1 }
        ]
      }
    },
    {
      $sort: { 
        created_at: -1 
      } 
    }
  ]).project({
    _id : 1,
    members: 1,
    created_at:1,
    "messages.member_id" :1,
    "messages.message" :1,
    "messages.created_at":1
  })
    response.send({
      success: conversations.length > 0 ? true : false,
      data: conversations
    });
 
} catch (error) {
  console.log('err' + error);
  response.status(500).send({
      ...error,
      success: false
  })
}

}
createConversation = async(request: express.Request, response: express.Response) => {
    try {
      console.log('is it comign');
      const requestData = request.body;  
      var conversation = new ConversationModel({
            members: requestData.members,
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
