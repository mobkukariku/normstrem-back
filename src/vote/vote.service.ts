import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Vote} from "./vote.schema";

@Injectable()
export class VoteService {
    constructor(@InjectModel('Vote') private voteModel: Model<Vote>) {}

    async saveVote(userId: string, questionId: string, vote: boolean): Promise<Vote> {
        const data = new this.voteModel({ userId, questionId, vote });
        return await data.save();
    }
}
