import { model, Model, Schema, Document } from 'mongoose';

interface IConversation extends Document {
  members: [{
      member_id: { type: Schema.Types.ObjectId, required: true },
  }],
  type: String,
  created_at:  Schema.Types.Date;
}
let ConversationSchema: Schema = new Schema({
  members: [{
    _id : false,
    member_id: { type: Schema.Types.ObjectId, required: true },
  }],
  created_at: Schema.Types.Date
});

let ConversationModel: Model<IConversation> = model<IConversation>('conversation', ConversationSchema);
export { 
  ConversationModel,
  IConversation
}

