import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AssignedSubjectDto } from 'src/core/dtos/responses/assigned-group.dto';
import { CodeEnum } from 'src/core/common/enums/code.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('api/professor')
export class ProfessorController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getprofessors')
    getProfessors(@Query('page', ParseIntPipe) page: number, @Query('size', ParseIntPipe) size: number) {
        return this.userUseCases.getProfessors(page, size);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Get('/getAssignedSubjects/:id')
    getAssignedSubjects(@Param('id', ParseIntPipe) id: number): Promise<AssignedSubjectDto[]> {
        return this.userUseCases.getProfessorAssignedSubjects(id);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Get('/getActiveAssignedSubjects/:id')
    getActiveAssignedSubjects(@Param('id', ParseIntPipe) id: number): Promise<AssignedSubjectDto[]> {
        return this.userUseCases.getProfessorActiveAssignedSubjects(id);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Post('/getCodeEventByActiveLecture')
    getCodeEventBySubjectKey(@Body() request: any): Promise<CodeEnum> {
        return this.userUseCases.getCodeEventByActiveLecture(request);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Post('/getCodeByActiveLecture')
    getCodeByActiveLecture(@Body() request: any): Promise<string> {
        return this.userUseCases.getCodeByActiveLecture(request);
    }
}