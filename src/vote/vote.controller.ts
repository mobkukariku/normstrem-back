import {Body, Controller, Post} from '@nestjs/common';
import {VoteService} from "./vote.service";
import {Vote} from "./vote.schema";

@Controller('vote')
export class VoteController {
    constructor(private readonly voteService: VoteService) {}

    @Post('save')
    async saveVote(@Body() dto: {userId:string, vote:boolean, questionId:string}): Promise<Vote> {
        return await this.voteService.saveVote(dto.userId, dto.questionId, dto.vote);
    }
}
