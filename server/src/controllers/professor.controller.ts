import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Header,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AssignedSubjectDto } from 'src/core/dtos/responses/assigned-group.dto';
import { ActiveLectureCodeState } from 'src/core/common/enums/code.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvUploadResultDto } from 'src/core/dtos/responses/csv-upload-result.dto';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/professor')
export class ProfessorController {
  @Inject(UserUseCases)
  private readonly userUseCases: UserUseCases;

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/getprofessors')
  getProfessors(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.userUseCases.getProfessors(page, size);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Get('/getAssignedSubjects/:id')
  getAssignedSubjects(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssignedSubjectDto[]> {
    return this.userUseCases.getProfessorAssignedSubjects(id);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Get('/getActiveAssignedSubjects/:id')
  getActiveAssignedSubjects(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssignedSubjectDto[]> {
    return this.userUseCases.getProfessorActiveAssignedSubjects(id);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/getCodeStateByActiveLecture')
  getCodeStateBySubjectKey(
    @Body() request: any,
  ): Promise<ActiveLectureCodeState> {
    return this.userUseCases.getCodeStateByActiveLecture(request);
  }

  @Roles('professor')
  @UseGuards(RoleGuard)
  @Post('/getCodeByActiveLecture')
  getCodeByActiveLecture(@Body() request: any): Promise<string> {
    return this.userUseCases.getCodeByActiveLecture(request);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Post('/uploadProfessors')
  @UseInterceptors(FileInterceptor('file'))
  uploadUsers(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({
            fileType: new RegExp('application/vnd.ms-excel|csv'),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CsvUploadResultDto> {
    return this.userUseCases.uploadProfessors(file);
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('/generateUploadTemplate')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=upload_template.csv')
  async generateUploadTemplate(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.userUseCases.generateUploadTemplate();
    return new StreamableFile(file);
  }
}
