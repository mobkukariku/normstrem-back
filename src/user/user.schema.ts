import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
    id: string;
    name: string;
    createdAt: Date;
}
