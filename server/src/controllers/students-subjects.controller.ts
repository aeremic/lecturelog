import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
  StreamableFile,
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

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Delete('/removeAllAssignedStudents/:id')
  removeAllAssignedStudents(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.studentsSubjectsUseCases.removeAllAssignedStudents(id);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Get('/downloadAssignedStudents/:id')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=assigned_students.csv')
  async downloadAssignedStudents(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.studentsSubjectsUseCases.downloadAssignedStudents(
      id,
    );
    return new StreamableFile(file);
  }
}
