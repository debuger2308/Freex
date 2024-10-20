import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from './images.model';
import { FilesService } from 'src/files/files.service';
import { UsersDataService } from 'src/user-data/users-data.service';


@Injectable()
export class ImagesService {
    constructor(@InjectModel(Images) private userRepository: typeof Images,
        private filesService: FilesService, private usersDataService: UsersDataService) { }

    async createImage(file: any, req: any) {
        
        const userData = await this.usersDataService.getUserData(req)
        if (userData.images.length < 10) {
            const fileName = await this.filesService.createFile(file)
            const image = await this.userRepository.create({ fileName: fileName })

            await userData.$set('images', [image, ...userData.images])
            return HttpStatus.CREATED
        }

        throw new HttpException('Too many images', HttpStatus.NOT_ACCEPTABLE)
    }


}
