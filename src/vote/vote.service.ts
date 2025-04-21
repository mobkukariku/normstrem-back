import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Vote} from "./vote.schema";

@Injectable()
export class VoteService {
    constructor(@InjectModel('Vote') private voteModel: Model<Vote>) {}

    async saveVote(userId: string, vote: boolean): Promise<Vote> {
        const newVote = new this.voteModel({ vote, userId });
        return newVote.save();
    }
}
