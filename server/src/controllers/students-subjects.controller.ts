import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { GetAssignedStudentsDto } from 'src/core/dtos/responses/get-assigned-students.dto';
import { StudentsSubjectsUseCases } from 'src/use-cases/students-subjects/students-subjects.use-case';

@UseGuards(AuthGuard('jwt'))
@Controller('api/studentssubjects')
export class StudentsSubjectsController {
  @Inject(StudentsSubjectsUseCases)
  private readonly studentsSubjectsUseCases: StudentsSubjectsUseCases;

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Get('/getAssignedStudents/:subjectId')
  getAssignedStudents(
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ): Promise<GetAssignedStudentsDto[]> {
    return this.studentsSubjectsUseCases.getAssignedStudents(subjectId);
  }
}
