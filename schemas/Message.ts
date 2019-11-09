import { model, Model, Schema } from 'mongoose';
import { IMessage } from './IMessage';
const MessageSchema: Schema = new Schema({
  conversation_id: {
    type: String,
    required: true
  },
  created_at: Schema.Types.Date,
  updated_at: Schema.Types.Date,
  message: String,
  sender_id: String
});

const MessageModel: Model<IMessage> = model<IMessage>('message', MessageSchema);
export = MessageModel;
