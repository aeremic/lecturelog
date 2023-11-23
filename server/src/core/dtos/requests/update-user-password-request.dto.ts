import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateUserPasswordRequestDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public currentPassword: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;

  @IsString()
  @IsNotEmpty()
  public repeatPassword: string;
}
