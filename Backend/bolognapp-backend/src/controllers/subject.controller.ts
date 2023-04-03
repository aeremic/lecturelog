import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import { SubjectEntity } from 'src/core/entities';
import { SubjectUseCases } from 'src/use-cases';

@Controller('api/subject')
export class SubjectController {
    @Inject(SubjectUseCases)
    private readonly subjectUseCases: SubjectUseCases

    @Get()
    get(){
        return this.subjectUseCases.get();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<SubjectEntity> {
        return this.subjectUseCases.getById(id);
    } 

    @Post()
    create(@Body() SubjectEntity: any): Promise<SubjectEntity> {
        return this.subjectUseCases.create(SubjectEntity)
    }
    
    @Put()
    update(@Body() SubjectEntity: any): Promise<SubjectEntity> {
        return this.subjectUseCases.update(SubjectEntity)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<number> {
        return this.subjectUseCases.delete(id)
    }

}