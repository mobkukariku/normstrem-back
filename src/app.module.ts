import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteModule } from './vote/vote.module';
import { UserModule } from './user/user.module';
import { QuestionController } from './question/question.controller';
import { QuestionModule } from './question/question.module';
import { QuestionService } from './question/question.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user/user.schema";
import {VoteSchema} from "./vote/vote.schema";
import {QuestionSchema} from "./question/question.schema";

@Module({
  imports: [
      VoteModule,
    UserModule,
    QuestionModule,
    MongooseModule.forRoot('mongodb+srv://tagankhozhaev:UcpEtEmsU6KEKvzq@cluster0.3lvuoyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Vote', schema: VoteSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
  ],
  controllers: [AppController, QuestionController],
  providers: [AppService, QuestionService],
})
export class AppModule {}
