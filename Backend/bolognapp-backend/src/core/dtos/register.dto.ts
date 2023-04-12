import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @IsNumber()
    @IsNotEmpty()
    public userType: number
  }
  