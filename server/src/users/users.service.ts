import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersDataService } from 'src/user-data/users-data.service';
import { SearchParamsService } from 'src/search-params/search-params.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private userDataService: UsersDataService,
        private searchParamsService: SearchParamsService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const userData = await this.userDataService.createUserData({
            age: null,
            city: null,
            description: null,
            name: null,
            gender: null,
            location: null
        })
        const searchParams = await this.searchParamsService.createSearchParams({
            distance: 80,
            maxAge: null,
            minAge: null,
            gender: null,
        })
        await user.$set('userData', userData)
        await user.$set('searchParams', searchParams)
        user.userData = userData
        return user
    }

    async getUserByNickname(nickname: string) {
        const user = await this.userRepository.findOne({
            where: { nickname }, include: { all: true }
        })
        return user
    }

    async getUserByUserId(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            include: ['userData']
        })
        return user
    }
    async getUserByUserIdWithVotes(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            include: ['votes']
        })
        return user
    }
    async findUserByToken(refreshToken) {
        const user = await this.userRepository.findOne({
            where: { refreshToken: refreshToken }
        })
        return user
    }
}
