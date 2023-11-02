import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
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

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/removeAssignedStudent')
  removeAssignedStudent(@Body() request: any): Promise<boolean> {
    return this.studentsSubjectsUseCases.removeAssignedStudent(request);
  }

  // @Roles('professor')
  // @UseGuards(RoleGuard)
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
  //   return this.studentsSubjectsUseCases.delete(id);
  // }
}
