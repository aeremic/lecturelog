import { IsNotEmpty, IsString } from 'class-validator';

export class SendPasswordResetEmailRequestDto {
  @IsString()
  @IsNotEmpty()
  public email: string;
}
