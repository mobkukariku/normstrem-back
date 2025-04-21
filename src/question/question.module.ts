import { Module } from '@nestjs/common';
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {MongooseModule} from "@nestjs/mongoose";
import {QuestionSchema} from "./question.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Question', schema: QuestionSchema },
        ]),
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService],
})
export class QuestionModule {}
