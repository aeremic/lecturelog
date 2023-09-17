import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AvailableGroupDto } from 'src/core/dtos/responses/available-group.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('api/student')
export class StudentController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getstudents')
    getStudents(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number) {
        return this.userUseCases.getStudents(page, size);
    }

    @Roles('student')
    @UseGuards(RoleGuard)
    @Get('/getAvailableGroups/:id')
    getAvailableGroups(@Param('id', ParseIntPipe) id: number): Promise<AvailableGroupDto[]> {
        return this.userUseCases.getStudentAvailableGroups(id);
    }
}       