import { Schema, Document } from 'mongoose';

export const QuestionSchema = new Schema({
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export interface Question extends Document {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}
