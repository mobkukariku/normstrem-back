import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Question} from "./question.schema";
import {Model} from "mongoose";
import {Vote} from "../vote/vote.schema";

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel('Question') private questionModel: Model<Question>,
        @InjectModel('Vote') private voteModel: Model<Vote>
    ) {}

    async createQuestion(userId: string, text: string): Promise<Question> {
        const question = new this.questionModel({ text, userId });
        return question.save();
    }

    async getQuestions(): Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async getRandomUnansweredQuestion(userId: string): Promise<Question | null> {
        let question;

        while (!question) {
            // Выбираем случайный вопрос
            const randomQuestion = await this.questionModel.aggregate([{ $sample: { size: 1 } }]).exec();

            if (randomQuestion.length > 0) {
                // Проверяем, ответил ли пользователь на этот вопрос
                const isAnswered = await this.hasUserAnswered(userId, randomQuestion[0]._id.toString());

                if (!isAnswered) {
                    question = randomQuestion[0]; // Если не ответил, возвращаем этот вопрос
                }
            }
        }

        return question;
    }

    // Проверка, ответил ли пользователь на вопрос (по записи в коллекции голосов)
    async hasUserAnswered(userId: string, questionId: string): Promise<boolean> {
        const vote = await this.voteModel.findOne({
            userId,
            questionId,
        }).exec();
        return !!vote;  // возвращает true, если пользователь ответил
    }

    // Сохранение ответа пользователя на вопрос
    async saveUserAnswer(userId: string, questionId: string, vote: boolean): Promise<Vote> {
        const userVote = new this.voteModel({
            userId,
            questionId,
            vote,
        });
        return userVote.save();
    }

}
