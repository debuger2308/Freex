import { Body, Controller, Get, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { SearchParamsService } from './search-params.service';
import { UserDataGuard } from 'src/auth/user-data.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { SetSearchParamsDto } from './dto/search-params.dto';

@Controller('search-params')
export class SearchParamsController {
    constructor(private searchParamsService: SearchParamsService) { }

    @Put('/set-params')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    setSearchParams(@Body() setUserDataDto: SetSearchParamsDto, @Req() req: any) {
        return this.searchParamsService.setSearchParams(setUserDataDto, req)
    }

    @Get('/get-params')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    getSearchParams( @Req() req: any) {
        return this.searchParamsService.getSearchParams(req)
    }
}
