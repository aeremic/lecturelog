import { MinLength } from "@nestjs/class-validator";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class EmailRegistrationDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    public userId: number;

    @IsString()
    @MinLength(5)
    @MaxLength(5)
    @IsNotEmpty()
    public code: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public repeatedPassword: string;
}
