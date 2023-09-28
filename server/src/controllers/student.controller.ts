import { Body, Controller, Delete, FileTypeValidator, Get, Inject, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AvailableGroupDto } from 'src/core/dtos/responses/available-group.dto';
import { CreateStudentRequestDto } from 'src/core/dtos/requests/create-student-request.dto';
import { CreateUpdateUserResponseDto } from 'src/core/dtos/responses/create-update-user-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvUploadResultDto } from 'src/core/dtos/responses/csv-upload-result.dto';

@Controller('api/student')
export class StudentController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('/getstudents')
    getStudents(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number) {
        return this.userUseCases.getStudents(page, size);
    }

    @Roles('student')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Get('/getAvailableSubjects/:id')
    getAvailableSubjects(@Param('id', ParseIntPipe) id: number): Promise<AvailableGroupDto[]> {
        return this.userUseCases.getStudentAvailableSubjects(id);
    }

    @Post('/createStudent')
    createStudent(@Body() createStudentRequestDto: CreateStudentRequestDto): Promise<CreateUpdateUserResponseDto> {
        return this.userUseCases.createStudent(createStudentRequestDto)
    }

    @Roles('admin', 'professor')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Post('/uploadStudents')
    @UseInterceptors(FileInterceptor('file'))
    uploadUsers(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 100000 }),
                new FileTypeValidator({ fileType: new RegExp("application\/vnd.ms-excel|csv") }),
            ]
        })
    ) file: Express.Multer.File): Promise<CsvUploadResultDto> {
        return this.userUseCases.uploadStudents(file);
    }
}       