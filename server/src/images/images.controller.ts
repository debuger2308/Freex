import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDataGuard } from 'src/auth/user-data.guard';



@Controller('images')
export class ImagesController {

    constructor(private imagesService: ImagesService) { }

    @Post('/set-image')
    @UseGuards(UserDataGuard)
    @UseInterceptors(FileInterceptor('profileImage'))
    createImage(@UploadedFile() image, @Req() req: any) {
        return this.imagesService.createImage(image, req)
    }

  
}
