import { Schema, Document } from 'mongoose';

export const VoteSchema = new Schema({
    vote: { type: Boolean, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export interface Vote extends Document {
    id: string;
    vote: boolean;
    userId: string;
    createdAt: Date;
}
