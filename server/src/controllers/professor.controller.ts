import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('api/professor')
export class ProfessorController {
    @Inject(UserUseCases)
    private readonly userUseCases: UserUseCases

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get('/getprofessors')
    getProfessors() {
        return this.userUseCases.getProfessors();
    }
}