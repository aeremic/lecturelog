import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AvailableGroupDto } from 'src/core/dtos/responses/available-group.dto';
import { CreateStudentRequestDto } from 'src/core/dtos/requests/create-student-request.dto';
import { CreateUserResponseDto } from 'src/core/dtos/responses/create-user-response.dto';

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
    createStudent(@Body() createStudentRequestDto: CreateStudentRequestDto): Promise<CreateUserResponseDto> {
        return this.userUseCases.createStudent(createStudentRequestDto)
    }
}       