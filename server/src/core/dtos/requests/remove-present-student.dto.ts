import { IsNumber } from 'class-validator';

export class RemovePresentStudentDto {
  @IsNumber()
  public subjectId: number;

  @IsNumber()
  public studentId: number;
}
