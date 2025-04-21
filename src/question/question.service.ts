import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Question} from "./question.schema";
import {Model} from "mongoose";

@Injectable()
export class QuestionService {
    constructor(@InjectModel('Question') private questionModel: Model<Question>) {}

    async saveCustomQuestion(userId: string, text: string): Promise<Question> {
        const question = new this.questionModel({ text, userId });
        return question.save();
    }
}
