import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from './messages.model';
import { ChatsService } from 'src/chats/chats.service';
import { ChatsGateway } from 'src/chats/chats.gateway';
import { Chats } from 'src/chats/chats.model';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Messages) private messagesRepository: typeof Messages,
        private chatsService: ChatsService, private chatsGateway: ChatsGateway) { }

    async createUserMessage(userId1, userId2, content) {
        const chat = await this.chatsService.findChat({ userId1, userId2 })
        if (chat) {

            const message = await this.messagesRepository.create({ messageType: 'user', message: content, userId: userId1, status: 'new' })
            chat.$set('messages', [...chat.messages, message])
            chat.save()
            this.chatsGateway.sentMessage('sendMessage', 'room/' + userId1, { chat: chat, message: message.get() })
            this.chatsGateway.sentMessage('receiveMessage', 'room/' + userId2, { chat: chat, message: message.get() })
            return message
        }
        else {
            const chat = await this.chatsService.createChat({ userId1: userId1, userId2: userId2, chatType: 'spam' })
            const message = await this.messagesRepository.create({ messageType: 'user', message: content, userId: userId1, status: 'new' })
            chat.$set('messages', [...chat.messages, message])
            chat.save()
            this.chatsGateway.sentMessage('receiveMessage', 'room/' + userId1, { chat: chat, message: message.get() })
            this.chatsGateway.sentMessage('receiveMessage', 'room/' + userId2, { chat: chat, message: message.get() })
            return message
        }
    }
    async createSystemMessage(context: string, systemType: string) {
        const message = await this.messagesRepository.create({ messageType: 'system', message: context, systemType, status: 'new' })
        return message
    }

    async updateMessageStatus(messages: Messages[], status: string) {
        const [affectedCount, messagesList] = await this.messagesRepository.update({ status: status },
            { where: { id: messages.map(message => message.id) }, returning: true })
        this.chatsGateway.updateMessage('updateMessagesStatus', 'room/' + messages[0].userId, messagesList)
        return messagesList
    }

}
