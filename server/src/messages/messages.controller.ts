import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserDataGuard } from 'src/auth/user-data.guard';
import { MessageDto } from './dto/create-message.dto';
import { Messages } from './messages.model';


@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) { }

    @Post('/send-message')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    sendMessage(@Body() messageDto: MessageDto, @Req() req: any) {
        return this.messagesService.createUserMessage(req.user.id, messageDto.userId, messageDto.message)
    }

    @Patch('/update-message-status')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    updateMessageStatus(@Body() messages: Messages[], @Req() req: any) {
        return this.messagesService.updateMessageStatus(messages, 'viewed')
    }


}

