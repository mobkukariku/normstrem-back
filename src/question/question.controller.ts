import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {QuestionService} from "./question.service";
import {Question} from "./question.schema";

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Post()
    async createQuestion(@Body() dto: {userId:string; text:string}): Promise<Question> {
        return await this.questionService.createQuestion(dto.userId, dto.text);
    }

    @Get()
    async getQuestions(): Promise<Question[]> {
        return await this.questionService.getQuestions();
    }

    @Get('random')
    async getRandomUnansweredQuestion(@Query('userId') userId: string) {
        const randomQuestion = await this.questionService.getRandomUnansweredQuestion(userId);

        if (randomQuestion) {
            return randomQuestion;
        } else {
            return { message: 'No more unanswered questions available.' };
        }
    }
}
