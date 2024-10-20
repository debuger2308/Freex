import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chats } from './chats.model';
import { UsersDataService } from 'src/user-data/users-data.service';
import { UsersData } from 'src/user-data/users-data.model';




const { Op } = require("sequelize");

@Injectable()
export class ChatsService {
    constructor(@InjectModel(Chats) private chatsRepository: typeof Chats,
        @Inject(forwardRef(() => UsersDataService)) private userDataService: UsersDataService,
    ) { }

    async createChat({ userId1, userId2, chatType }: { userId1: number, userId2: number, chatType: string }) {
        const chat = await this.chatsRepository.create({ chatId: `${userId1}-${userId2}`, chatType: chatType, messages: [], userId1: userId1, userId2: userId2 })
        const userData1 = await this.userDataService.getUserDataById(userId1)
        const userData2 = await this.userDataService.getUserDataById(userId2)
        await chat.$set('userData', [userData1, userData2])
        return chat
    }


    async findChat({ userId1, userId2 }: { userId1: number, userId2: number }): Promise<Chats | null> {
        const chat = await this.chatsRepository.findOne({
            where: {
                [Op.or]: [
                    { chatId: `${userId1}-${userId2}` },
                    { chatId: `${userId2}-${userId1}` },
                ]
            }, include: ['messages']
        })

        return chat
    }

    async updateChat({ chatId, chatType }: { chatId: string, chatType: string }) {
        const [affectedCount, chat] = await this.chatsRepository.update({ chatType: chatType }, { where: { chatId: chatId }, returning: true })
        return chat
    }

    async getChats(userId: number) {
        const chats = await this.chatsRepository.findAll({
            where: {
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId },
                ]
            }, include: ['messages', { model: UsersData, attributes: ['name','userId'], include: ['images'] }]
        })

        return chats
  
    }
}
