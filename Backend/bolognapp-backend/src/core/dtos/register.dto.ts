import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RoleEnum } from "../common/enums/role.enum";

export class RegisterDto {  
    @IsString()
    @IsNotEmpty()
    public firstname: string;

    @IsString()
    @IsNotEmpty()
    public lastname: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public role: RoleEnum
  }
  