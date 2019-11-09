import { model, Model, Schema } from 'mongoose';
import { IConversation } from './IConversation';
var ConversationSchema: Schema = new Schema({
  connections: [{
    type: String,
    required: true
  }],
  created_at: Schema.Types.Date
});

var ConversationModel: Model<IConversation> = model<IConversation>('conversation', ConversationSchema);
export = ConversationModel 

