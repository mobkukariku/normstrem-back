import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {VoteService} from "./vote.service";
import {UserService} from "../user/user.service";
import {QuestionService} from "../question/question.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class VoteGateway implements  OnGatewayConnection{
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly voteService: VoteService,
        private readonly userService: UserService,
        private readonly questionService: QuestionService
        ) {}

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('setName')
    async handleSetName(@MessageBody() data: { name: string }, @ConnectedSocket() client: Socket) {
        const user = await this.userService.createUser(data.name);
        client.data.userId = user._id;
        client.emit('nameSet', { userId: user._id });
    }

    @SubscribeMessage('sendVote')
    async handleVote(
        @MessageBody() data: {questionId: string, vote: boolean},
        @ConnectedSocket() client: Socket,
    ) {
        if(!client.data.userId) {
            client.emit('error', { message: 'User not set' });
            return;
        }
        await this.voteService.saveVote(client.data.userId, data.vote);
        client.emit('voteSaved');
    }

    @SubscribeMessage('customQuestion')
    async handleCustomQuestion(
        @MessageBody() data: {question: string},
        @ConnectedSocket() client: Socket,
    ) {
        if(!client.data.userId) {
            client.emit('error', {message: 'User not identified'});
            return;
        }
        await this.questionService.saveCustomQuestion(client.data.userId, data.question);
        client.emit('questionSaved');
    }
}