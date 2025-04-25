import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import {VoteSchema} from "./vote.schema";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user/user.schema";
import {UserModule} from "../user/user.module";
import {QuestionModule} from "../question/question.module";

@Module({
    imports: [
        UserModule, // 👈
        QuestionModule, // 👈 если используется
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
            { name: 'Vote', schema: VoteSchema }]),
    ],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
