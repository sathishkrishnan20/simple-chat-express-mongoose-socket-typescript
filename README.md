# simple-chat-express-mongoose-socket-typescript
A Simple Chat API by using node.js, express, Mongoose, Socket, and typescript

to Run the Application
  on terminal -> npm run dev


Simple chat Application

    1. To start the new conversation call the "api/conversation" API with members of the chat you will get the conversationId

    2.to send the message call the "api/message" API by using the conversationId which is generated.

    3. To get All the conversationId with the last messege for particular memberId, use "api/conversations/member/[memberId]"  

    4. To GET the messages, we have to request via Conversation ID by calling the API "api/conversation/[CONVERSATIONID]/messages?skip=0&limit=25"

Sample Request 

 1. Start the Conversation
    
    Endpoint: api/conversation [POST]
 
 *  Request
```
    {
	    "members": [
		    { "member_id": "5dc7bae0d2d91a7d968441e9"  }, //MongoId
		    { "member_id":"5dc7ba8abc09b57d92876916" }
	    ]
    }
```
* Response 
```
    {
        "success": true,
        "conversationId": "5dc82f566572b28456d3101a"
    }  
```

2. Send the Message

   Endpoint: api/message [POST]

* Requset   
```
    {
	    "conversation_id": "5dc7ca758abf197f448cf939",
        "member_id": "5dc7ba8abc09b57d92876916",
        "message": "Sixth Message From Krish"
    }
```

* Response 
```
    {
        "success": true
    }
```


3. Get the conversationId with the last message of the conversation

   Endpoint: api/conversations/member/[MEMBERID]

*  Response 
```
{
    "success": true,
    "data": [
        {
            "_id": "5dc845e56b9daa885d3fe3ff",
            "members": [
                {
                    "member_id": "5dc7bae0d2d91a7d968441e9"
                },
                {
                    "member_id": "5dc7ba8abc09b57d92876916"
                }
            ],
            "created_at": "2019-11-10T17:16:21.932Z",
            "messages": [
                {
                    "member_id": "5dc7bae0d2d91a7d968441e9",
                    "message": "Fifth Message",
                    "created_at": "2019-11-10T17:17:07.562Z"
                }
            ]
        },
        {
            "_id": "5dc845486b9daa885d3fe3f9",
            "members": [
                {
                    "member_id": "5dc7bae0d2d91a7d968441e9"
                },
                {
                    "member_id": "5dc7ba8abc09b57d92876916"
                }
            ],
            "created_at": "2019-11-10T17:13:44.107Z",
            "messages": [
                {
                    "member_id": "5dc7ba8abc09b57d92876916",
                    "message": "Sixth Message",
                    "created_at": "2019-11-10T17:15:00.768Z"
                }
            ]
        }
    ]
} 
```

4. Get the messages of the conversation

   Endpoint : api/conversation/[CONVERSATIONID]/messages?skip=0&limit=25

*  Response
```
{
    "success": true,
    "data": [
        {
            "member_id": "5dc7bae0d2d91a7d968441e9",
            "message": "Fifth Message",
            "created_at": "2019-11-10T17:17:07.562Z"
        },
        {
            "member_id": "5dc7ba8abc09b57d92876916",
            "message": "Fourth Message",
            "created_at": "2019-11-10T17:17:02.239Z"
        },
        {
            "member_id": "5dc7ba8abc09b57d92876916",
            "message": "Third Message",
            "created_at": "2019-11-10T17:16:51.990Z"
        },
        {
            "member_id": "5dc7bae0d2d91a7d968441e9",
            "message": "Second Message",
            "created_at": "2019-11-10T17:16:43.363Z"
        },
        {
            "member_id": "5dc7ba8abc09b57d92876916",
            "message": "First Message",
            "created_at": "2019-11-10T17:16:37.850Z"
        }
    ]
}
```

PostMan test Link 
https://www.getpostman.com/collections/a642af9f584d72e10077