import { IsNumber } from 'class-validator';

export class RemoveLectureAttendeeDto {
  @IsNumber()
  public subjectId: number;

  @IsNumber()
  public studentId: number;
}
