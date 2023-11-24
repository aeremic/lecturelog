import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  repeatedPassword: string;
}
