import { forwardRef, Inject, Injectable, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { UserDataGuard } from 'src/auth/user-data.guard';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@Injectable()
export class ChatsGateway {
    @WebSocketServer()
    server: Server;

    constructor(@Inject(forwardRef(() => MessagesService)) private messagesService: MessagesService) { }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @MessageBody('room') room: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.join(room);
        console.log(`Client ${client.id} joined room: ${room}`);
    }

    // @SubscribeMessage('updateMessagesStatus')
    // async handleSendMessage(
    //     @MessageBody() message:  number[],
    //     @ConnectedSocket() client: Socket,
    // ) {
    //     console.log(message);
    //     await this.messagesService.updateMessageStatus(message, 'seen')
    //     this.server.to(message.room).emit('updateMessagesStatus', message);
    // }
    updateMessage(event: string, room: string, data: any) {
        this.server.to(room).emit(event, data);
    }

    sentMessage(event: string, room: string, data: any) {
        this.server.to(room).emit(event, data);
    }

}