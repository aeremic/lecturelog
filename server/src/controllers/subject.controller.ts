import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { SubjectEntity } from 'src/core/entities';
import { SubjectUseCases } from 'src/use-cases';

@UseGuards(AuthGuard('jwt'))
@Controller('api/subject')
export class SubjectController {
    @Inject(SubjectUseCases)
    private readonly subjectUseCases: SubjectUseCases

    @Roles('admin', 'professor')
    @UseGuards(RoleGuard)
    @Get()
    get(){
        return this.subjectUseCases.get();
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
        return this.subjectUseCases.getById(id);
    } 

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Post()
    create(@Body() subjectEntity: any): Promise<SubjectEntity> {
        return this.subjectUseCases.create(subjectEntity)
    }
    
    @Roles('admin')
    @UseGuards(RoleGuard)
    @Put()
    update(@Body() subjectEntity: any): Promise<SubjectEntity> {
        return this.subjectUseCases.update(subjectEntity)
    }

    @Roles('admin')
    @UseGuards(RoleGuard)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.subjectUseCases.delete(id)
    }
}