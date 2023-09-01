import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { AssignedGroupDto } from 'src/core/dtos/responses/assigned-group.dto';
import { CodeEnum } from 'src/core/common/enums/code,enum';

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
    @Get('/getAssignedGroups/:id')
    getAssignedGroups(@Param('id', ParseIntPipe) id: number): Promise<AssignedGroupDto[]> {
        return this.userUseCases.getProfessorAssignedGroups(id);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Get('/getActiveAssignedGroups/:id')
    getActiveAssignedGroups(@Param('id', ParseIntPipe) id: number): Promise<AssignedGroupDto[]> {
        return this.userUseCases.getProfessorActiveAssignedGroups(id);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Get('/getLastCodeEventByGroupId/:id')
    getLastCodeEventByGroupId(@Param('id', ParseIntPipe) id: number): Promise<CodeEnum> {
        return this.userUseCases.getLastCodeEventByGroupId(id);
    }

    @Roles('professor')
    @UseGuards(RoleGuard)
    @Get('/getCodeByGroupId/:id')
    getCodeByGroupId(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.userUseCases.getCodeByGroupId(id);
    }
}