import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUpdateSubjectRequestDto {
  @IsNumber()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public pointsPerPresence: number;

  @IsNumber()
  @IsNotEmpty()
  public professorId: number;
}
