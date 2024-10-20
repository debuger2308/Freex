import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator"


export class SetSearchParamsDto {

    @MaxLength(30, { message: "Must be less then 30 symbols" })
    @IsString({ message: "Must be string" })
    readonly gender: string

    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "Must be number" })
    @Min(0)
    @Max(999)
    readonly distance: number

    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "Must be number" })
    @Min(18)
    @Max(99)
    readonly minAge: number

    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: "Must be number" })
    @Min(18)
    @Max(99)
    readonly maxAge: number

}