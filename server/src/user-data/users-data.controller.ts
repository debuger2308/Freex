import { Body, Controller, Put, UseGuards, Req, UsePipes, Get } from '@nestjs/common';
import { UsersDataService } from './users-data.service';
import { SetUserDataDto } from './dto/set-user-data.dto';
import { UserDataGuard } from 'src/auth/user-data.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';


@Controller('user-data')
export class UsersDataController {
    constructor(private usersDataService: UsersDataService) { }

    @Put('/set-data')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    setUserData(@Body() setUserDataDto: SetUserDataDto, @Req() req: any) {
        return this.usersDataService.setUserData(setUserDataDto, req)
    }

    @Get('/get-users-data')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    getUsersData(@Req() req: any) {
        return this.usersDataService.getUsersData(req)
    }
    @Get('/get-user-data')
    @UseGuards(UserDataGuard)
    @UsePipes(ValidationPipe)
    getUserData(@Req() req: any) {
        return this.usersDataService.getUserData(req)
    }
}
