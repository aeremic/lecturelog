import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Roles } from "../common/enums/roles.enum";

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
    public role: Roles
  }
  