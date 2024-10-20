import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class SetUserDataDto {

    @ApiProperty({ example: 22, description: "User`s age" })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "Must be number" })
    @Min(18)
    @Max(99)
    readonly age: number

    @ApiProperty({ example: "Kiev", description: "User`s city" })
    @MaxLength(30, { message: "Must be less then 30 symbols" })
    @IsString({ message: "Must be string" })
    readonly gender: string

    @MaxLength(30, { message: "Must be less then 30 symbols" })
    @IsString({ message: "Must be string" })
    readonly city: string

    @MaxLength(120, { message: "Must be less then 120 symbols" })
    @IsString({ message: "Must be string" })
    readonly location: string

    @ApiProperty({ example: "User description", description: "User`s description" })
    @MaxLength(320, { message: "Must be less then 320 symbols" })
    @IsString({ message: "Must be string" })
    readonly description: string

    @ApiProperty({ example: "David", description: "User`s name" })
    @MaxLength(20, { message: "Must be less then 20 symbols" })
    @IsString({ message: "Must be string" })
    readonly name: string

}