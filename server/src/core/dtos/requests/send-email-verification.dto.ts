import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class SendEmailVerificationDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public userId: number;
}
