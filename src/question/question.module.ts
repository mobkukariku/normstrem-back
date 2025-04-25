import { Module } from '@nestjs/common';
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {MongooseModule} from "@nestjs/mongoose";
import {QuestionSchema} from "./question.schema";
import {VoteSchema} from "../vote/vote.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Question', schema: QuestionSchema },
            { name: 'Vote', schema: VoteSchema },
        ]),
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService],
})
export class QuestionModule {}
