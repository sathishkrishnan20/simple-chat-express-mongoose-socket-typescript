import { model, Model, Schema , Document} from 'mongoose';
import { ObjectID } from 'bson';
interface IMessage extends Document {
  conversation_id: ObjectID,
  member_id: ObjectID,
  created_at?: Date,
  updated_at?: Date,
  message: String,
}

const MessageSchema: Schema = new Schema({
  conversation_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  member_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  message: String,
  created_at: Schema.Types.Date,
  updated_at: Schema.Types.Date,
  
});

const MessageModel: Model<IMessage> = model<IMessage>('message', MessageSchema);
export {
  MessageModel, 
  IMessage
};
