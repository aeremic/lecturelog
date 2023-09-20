import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RoleEnum } from "../../common/enums/role.enum";

export class RegisterStudentDto {
    @IsNumber()
    public id: number;

    @IsString()
    @IsNotEmpty()
    public firstname: string;

    @IsString()
    @IsNotEmpty()
    public lastname: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNumber()
    @IsNotEmpty()
    public index: number;

    @IsNumber()
    @IsNotEmpty()
    public year: number;

    @IsString()
    @IsNotEmpty()
    public role: RoleEnum
}