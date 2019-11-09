import { Document, Schema } from "mongoose";

export interface IConversation extends Document {
    connections: string[];
    created_at:  Schema.Types.Date;
}