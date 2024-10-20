import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class MessageDto {

    readonly message: string

    readonly userId: number

}