import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsString, Length } from "class-validator"

export class VotesDto {

    @ApiProperty({ example: true, description: "True - like, false - dislike" })

    // @IsBoolean({ message: 'Must be boolean' })
    readonly vote: boolean

    @ApiProperty({ example: 32, description: "Liked user id" })
    readonly votedUserId: number
}