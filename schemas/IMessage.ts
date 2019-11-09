import { Document, Schema } from "mongoose";
export interface IMessage extends Document {
  conversation_id: String,
  created_at?: Date,
  updated_at?: Date,
  message: String,
  sender_id: String
}