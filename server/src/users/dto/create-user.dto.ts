import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({ example: "nickname", description: "User nickname" })
    @IsString({ message: 'Must be string' })
    @Length(4, 12, { message: 'No less than four and no more than twelve' })
    readonly nickname: string

    @ApiProperty({ example: "password", description: "User password" })
    @IsString({ message: 'Must be string' })
    @Length(4, 16, { message: 'No less than four and no more than sixteen' })
    readonly password: string
}