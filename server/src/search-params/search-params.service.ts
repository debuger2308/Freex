import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SearchParams } from './search-params.model';
import { SetSearchParamsDto } from './dto/search-params.dto';

@Injectable()
export class SearchParamsService {
    constructor(@InjectModel(SearchParams) private userRepository: typeof SearchParams) { }

    async createSearchParams(dto: SetSearchParamsDto) {
        const searchParams = await this.userRepository.create(dto)
        return searchParams
    }

    async setSearchParams(dto: SetSearchParamsDto, req: any) {
        if (dto.maxAge <= dto.minAge) throw new HttpException('Max age must be more than min age', HttpStatus.BAD_REQUEST)

        const [, [searchParams]] = await this.userRepository.update(dto, { where: { userId: req.user.id }, returning: true })

        if (!searchParams) throw new HttpException('DataBase Error, SearchParams not found', HttpStatus.INTERNAL_SERVER_ERROR)

        return searchParams
    }

    async getSearchParams(req: any) {
        const searchParams = await this.userRepository.findOne({ where: { userId: req.user.id } })
        return {
            gender: searchParams?.gender,
            distance: searchParams?.distance,
            minAge: searchParams?.minAge,
            maxAge: searchParams?.maxAge,
        }
    }
}
