import { MinLength } from "@nestjs/class-validator";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator";

export class SendEmailVerificationDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    public userId: number;
}